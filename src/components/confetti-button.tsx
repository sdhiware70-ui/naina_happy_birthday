"use client";

import { useRef } from 'react';
import confetti from 'canvas-confetti';
import * as Tone from 'tone';
import { Button } from './ui/button';
import { PartyPopper } from 'lucide-react';

export function ConfettiButton() {
    const audioInitialized = useRef(false);

    const playBirthdaySong = async () => {
        if (!audioInitialized.current) {
            try {
                await Tone.start();
                audioInitialized.current = true;
                console.log("AudioContext started");
            } catch (e) {
                console.error("Could not start AudioContext: ", e);
                return;
            }
        }
        
        const synth = new Tone.Synth().toDestination();
        const now = Tone.now();

        // Simple "Happy Birthday" melody
        const melody = [
            { note: 'G4', duration: '8n', time: now },
            { note: 'G4', duration: '8n', time: now + 0.25 },
            { note: 'A4', duration: '4n', time: now + 0.5 },
            { note: 'G4', duration: '4n', time: now + 1 },
            { note: 'C5', duration: '4n', time: now + 1.5 },
            { note: 'B4', duration: '2n', time: now + 2 },

            { note: 'G4', duration: '8n', time: now + 3 },
            { note: 'G4', duration: '8n', time: now + 3.25 },
            { note: 'A4', duration: '4n', time: now + 3.5 },
            { note: 'G4', duration: '4n', time: now + 4 },
            { note: 'D5', duration: '4n', time: now + 4.5 },
            { note: 'C5', duration: '2n', time: now + 5 },
        ];

        melody.forEach(note => {
            synth.triggerAttackRelease(note.note, note.duration, note.time);
        });
    }

    const handleConfetti = () => {
        playBirthdaySong();

        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                onClick={handleConfetti}
                className="h-16 w-16 rounded-full shadow-2xl animate-bounce"
                size="icon"
                aria-label="Emergency Party Button"
            >
                <PartyPopper className="h-8 w-8" />
            </Button>
        </div>
    );
}
