"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useFirebase } from "./firebase-provider";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HeartPulse, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "./ui/skeleton";

interface Wish {
    id: string;
    text: string;
    authorName: string;
    authorPhotoURL: string;
    createdAt: Timestamp;
}

function WishCard({ wish }: { wish: Wish }) {
    return (
        <Card className="shadow-md transition-all hover:shadow-lg bg-card/80 backdrop-blur">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={wish.authorPhotoURL} alt={wish.authorName} />
                            <AvatarFallback>{wish.authorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-base">{wish.authorName}</CardTitle>
                            <CardDescription>
                                {wish.createdAt ? new Date(wish.createdAt.toDate()).toLocaleString() : 'Just now'}
                            </CardDescription>
                        </div>
                    </div>
                    <div className="text-primary p-2 bg-primary/10 rounded-full">
                        <HeartPulse className="h-5 w-5" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/90 whitespace-pre-wrap">{wish.text}</p>
                <div className="mt-4 pt-4 border-t border-dashed">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Friendship Vital Signs:</h4>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1"><span className="font-bold text-green-500">Love:</span> 99.9%</span>
                        <span className="flex items-center gap-1"><span className="font-bold text-blue-500">Support:</span> 100%</span>
                        <span className="flex items-center gap-1"><span className="font-bold text-yellow-500">Fun:</span> Critical</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}


export function GuestbookSection() {
    const { user } = useFirebase();
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [newWish, setNewWish] = useState("");
    const [loadingWishes, setLoadingWishes] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const wishesData: Wish[] = [];
            querySnapshot.forEach((doc) => {
                wishesData.push({ id: doc.id, ...doc.data() } as Wish);
            });
            setWishes(wishesData);
            setLoadingWishes(false);
        }, (error) => {
            console.error("Error fetching wishes:", error);
            toast({ title: "Error", description: "Could not fetch wishes.", variant: "destructive" });
            setLoadingWishes(false);
        });

        return () => unsubscribe();
    }, [toast]);

    const handleSubmitWish = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({ title: "Not logged in", description: "Please sign in to leave a wish.", variant: "destructive" });
            return;
        }
        if (newWish.trim() === "") {
            toast({ title: "Empty wish", description: "Please write something.", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "wishes"), {
                text: newWish,
                authorName: user.displayName,
                authorPhotoURL: user.photoURL,
                createdAt: serverTimestamp(),
            });
            setNewWish("");
            toast({ title: "Success!", description: "Your wish has been posted." });
        } catch (error) {
            console.error("Error adding document: ", error);
            toast({ title: "Error", description: "Could not post your wish.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="guestbook" className="py-20 md:py-24 bg-primary/10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Live Heartbeat Guestbook</h2>
                    <p className="mt-2 text-muted-foreground">Share your birthday wishes and check out the friendship vital signs!</p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {user && (
                        <form onSubmit={handleSubmitWish} className="mb-8">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex gap-4">
                                        <Avatar>
                                            <AvatarImage src={user.photoURL ?? ""} />
                                            <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="w-full space-y-2">
                                            <Textarea
                                                value={newWish}
                                                onChange={(e) => setNewWish(e.target.value)}
                                                placeholder={`Writing as ${user.displayName}...`}
                                                rows={3}
                                                disabled={isSubmitting}
                                            />
                                            <Button type="submit" disabled={isSubmitting}>
                                                <Send className="mr-2 h-4 w-4" />
                                                {isSubmitting ? 'Posting...' : 'Post Wish'}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </form>
                    )}
                    
                    <div className="space-y-6">
                        {loadingWishes ? (
                           [...Array(3)].map((_, i) => (
                             <Card key={i} className="shadow-sm">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="w-full space-y-2">
                                            <Skeleton className="h-4 w-1/3" />
                                            <Skeleton className="h-3 w-1/4" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3 mt-2" />
                                </CardContent>
                             </Card>
                           ))
                        ) : wishes.length > 0 ? (
                            wishes.map((wish) => <WishCard key={wish.id} wish={wish} />)
                        ) : (
                            <Card className="text-center py-10">
                                <CardContent>
                                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <p className="mt-4 text-muted-foreground">No wishes yet. Be the first to post!</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
