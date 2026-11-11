"use client";

import Image from "next/image";
import classes from "./clientslider.module.css";
import { useEffect, useRef, useState } from "react";

import Indihood from "../../../assets/logos/indihood_logo.png";
import avanti from "../../../assets/logos/avanti.png";
import stabilitas from "../../../assets/logos/stabilitas.png";
import tokopedia from "../../../assets/logos/tokopedia.png";
import venzi from "../../../assets/logos/venzi.png";
import connectWorks from "../../../assets/logos/connect_works.png";
import notebene from "../../../assets/logos/notebene.png";
import simplifyMoney from "../../../assets/logos/simplify_money.png";
import auxo from "../../../assets/logos/auxo.png";
import aol from "../../../assets/logos/AOI.png";
import redblocktree from "../../../assets/logos/redblocktree.png";
// ── New logos ──
import akyrian       from "../../../assets/logos/Akyrian.png";
import alienvault    from "../../../assets/logos/Alienvault.png";
import arcitecto     from "../../../assets/logos/Arcitecto.png";
import aroundMedia   from "../../../assets/logos/AroundMedia.jpg"; 
import doxa          from "../../../assets/logos/doxa.png";
import foraTravel    from "../../../assets/logos/FORATravel.png";
import iqHive        from "../../../assets/logos/IQ-Hive_logo.png";
import panther       from "../../../assets/logos/panther.png";
import prompto       from "../../../assets/logos/prompto.png";
import solidNetworks from "../../../assets/logos/Solid-Networks.png";

const clientLogos = [
  { id: 1, src: connectWorks, alt: "Connect Works" },
  { id: 2, src: notebene, alt: "Notebene" },
  { id: 3, src: simplifyMoney, alt: "Simplify Money" },
  { id: 4, src: auxo, alt: "Auxo" },
  { id: 5, src: Indihood, alt: "Indihood" },
  { id: 6, src: avanti, alt: "Avanti" },
  { id: 7, src: aol, alt: "AOL" },
  { id: 8, src: redblocktree, alt: "RedBlockTree" },
  { id: 9, src: stabilitas, alt: "Stabilitas" },
  { id: 10, src: tokopedia, alt: "Tokopedia" },
  { id: 11, src: venzi,         alt: "Venzi" },
  // ── New logos ──
  { id: 12, src: akyrian,       alt: "Akyrian" },
  { id: 13, src: alienvault,    alt: "Alienvault" },
  { id: 14, src: arcitecto,     alt: "Arcitecto" },
  { id: 15, src: aroundMedia,   alt: "Around Media" }, 
  { id: 16, src: doxa,          alt: "Doxa" },
  { id: 17, src: foraTravel,    alt: "FORA Travel" },
  { id: 18, src: iqHive,        alt: "IQ-Hive" },
  { id: 19, src: panther,       alt: "Panther" },
  { id: 20, src: prompto,       alt: "Prompto" },
  { id: 22, src: solidNetworks, alt: "Solid State Networks" },
];

type ClientSliderProps = {
  heading: string;
};

export default function ClientSlider({ heading }: ClientSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [step, setStep] = useState(0);
  const [maxPosition, setMaxPosition] = useState(0);

  useEffect(() => {
    const updateMeasurements = () => {
      const marquee = marqueeRef.current;
      const track = trackRef.current;
      const cards = track?.children;

      if (!marquee || !track || !cards?.length) return;

      const firstCard = cards[0] as HTMLElement;
      const secondCard = cards[1] as HTMLElement | undefined;
      const nextStep = secondCard
        ? secondCard.offsetLeft - firstCard.offsetLeft
        : firstCard.offsetWidth;
      const nextMaxPosition = Math.max(0, track.scrollWidth - marquee.clientWidth);

      setStep((current) => (current === nextStep ? current : nextStep));
      setMaxPosition((current) =>
        current === nextMaxPosition ? current : nextMaxPosition,
      );
      setPosition((current) => Math.min(current, nextMaxPosition));
    };

    const resizeObserver = new ResizeObserver(updateMeasurements);
    if (marqueeRef.current) resizeObserver.observe(marqueeRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    updateMeasurements();
    const animationFrame = window.requestAnimationFrame(updateMeasurements);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  const slide = (dir: "left" | "right") => {
    setPosition((current) => {
      const nextPosition = dir === "right" ? current + step : current - step;
      return Math.max(0, Math.min(nextPosition, maxPosition));
    });
  };

  const isBeginning = position <= 0;
  const isEnd = position >= maxPosition - 1;
  return (
  <section className={classes.wrapper}>
    <div className={classes.container}>
      <h4 className={classes.heading}>
        {heading}
      </h4>
    </div>

    <div className={classes.sliderContainer}>
      {/* Left Arrow */}
      <button
        className={classes.arrowBtn}
        onClick={() => slide("left")}
        disabled={isBeginning}
        aria-label="Previous client logos"
      >
        ‹
      </button>

      <div className={classes.marquee} ref={marqueeRef}>
        <div
          ref={trackRef}
          className={classes.track}
          style={{ transform: `translateX(-${position}px)` }}
        >
          {clientLogos.map((logo) => (
            <div
              key={logo.id}
              className={classes.logoCard}
            >
              <Image src={logo.src} alt={logo.alt} width={180} height={60} className={classes.logo} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        className={classes.arrowBtn}
        onClick={() => slide("right")}
        disabled={isEnd}
        aria-label="Next client logos"
      >
        ›
      </button>
    </div>
  </section>
);
}
