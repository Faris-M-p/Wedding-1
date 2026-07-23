import { DoorIntro } from "@/components/DoorIntro";
import { Hero } from "@/components/Hero";
import { MusicPlayer } from "@/components/MusicPlayer";
import { BibleVerse } from "@/components/sections/BibleVerse";
import { Invitation } from "@/components/sections/Invitation";
import { Countdown } from "@/components/sections/Countdown";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Timeline } from "@/components/sections/Timeline";
import { ChurchDetails } from "@/components/sections/ChurchDetails";
import { Reception } from "@/components/sections/Reception";
import { Parents } from "@/components/sections/Parents";
import { Gallery } from "@/components/sections/Gallery";
import { Rsvp } from "@/components/sections/Rsvp";
import { Blessings } from "@/components/sections/Blessings";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <DoorIntro />
      <MusicPlayer />
      <main>
        <Hero />
        <BibleVerse />
        <Invitation />
        <Countdown />
        <GoldDivider from="background" to="background" />
        <Timeline />
        <ChurchDetails />
        <Reception />
        <Parents />
        <Gallery />
        <Rsvp />
        <Blessings />
      </main>
      <Footer />
    </>
  );
}
