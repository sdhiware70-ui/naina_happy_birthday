import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { PrescriptionSection } from '@/components/prescription-section';
import { GuestbookSection } from '@/components/guestbook-section';
import { GallerySection } from '@/components/gallery-section';
import { ConfettiButton } from '@/components/confetti-button';
import { FirebaseProvider } from '@/components/firebase-provider';

export default function Home() {
  return (
    <FirebaseProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <PrescriptionSection />
          <GuestbookSection />
          <GallerySection />
        </main>
        <ConfettiButton />
        <footer className="text-center p-4 text-muted-foreground text-sm">
          <p>Made with ❤️ for the best doctor in the world.</p>
        </footer>
      </div>
    </FirebaseProvider>
  );
}
