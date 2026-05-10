import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";

export function GallerySection() {
    return (
        <section id="gallery" className="py-20 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Down Memory Lane</h2>
                    <p className="mt-2 text-muted-foreground">A gallery of our best moments together.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
                    {PlaceHolderImages.map((image, i) => {
                        const isPortrait = image.imageUrl.includes('/400/600');
                        // Create a more dynamic layout
                        let classNames = "row-span-1";
                        if (isPortrait) classNames = "row-span-2";
                        if (i === 0 || i === PlaceHolderImages.length - 1) classNames += " col-span-2 md:col-span-2";
                        
                        return (
                            <Card key={image.id} className={`group relative overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${classNames}`}>
                                <Image
                                    src={image.imageUrl}
                                    alt={image.description}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    data-ai-hint={image.imageHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white text-sm font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{image.description}</p>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
