"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { HeartbeatIcon } from "./icons";
import { useEffect, useState } from "react";

export function PrescriptionSection() {
    const [date, setDate] = useState('');

    useEffect(() => {
        setDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    const treatments = [
        { name: "100% Joy", description: "To be taken daily" },
        { name: "0% Stress", description: "Effective immediately" },
        { name: "Unlimited Cake", description: "As needed for celebration" },
        { name: "Continuous Laughter", description: "Administer with friends" },
    ];

    return (
        <section id="prescription" className="py-20 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <Card className="shadow-lg overflow-hidden border-2 border-primary/20">
                        <CardHeader className="bg-primary/10 p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl font-bold font-headline text-primary-foreground">
                                        Birthday Prescription
                                    </CardTitle>
                                    <CardDescription className="text-primary-foreground/80">
                                        For: Dr. Naina Parashar | Date: {date}
                                    </CardDescription>
                                </div>
                                <div className="text-primary">
                                  <HeartbeatIcon className="h-10 w-10" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-4 text-lg">Rx / Treatments:</h3>
                            <ul className="space-y-4">
                                {treatments.map((treatment) => (
                                    <li key={treatment.name} className="flex items-start">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                                        <div>
                                            <p className="font-semibold">{treatment.name}</p>
                                            <p className="text-sm text-muted-foreground">{treatment.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
                                <p><span className="font-bold">Prescribed by:</span> All your friends & family</p>
                                <p><span className="font-bold">Refills:</span> Unlimited, for life!</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
