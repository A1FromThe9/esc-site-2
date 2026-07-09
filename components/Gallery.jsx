"use client";

import { useState } from "react";
import Image from "next/image";
import { photo } from "@/lib/format";

export default function Gallery({ photos, name }) {
  const [open, setOpen] = useState(null);

  return (
    <>
      <div className="gallery">
        <figure className="g-main" onClick={() => setOpen(photo(photos[0], 1200, 900))}>
          <Image src={photo(photos[0], 900, 675)} alt={`${name}, photo 1`} width={900} height={675} priority />
        </figure>
        {photos.slice(1).map((seed, i) => (
          <figure key={seed} onClick={() => setOpen(photo(seed, 900, 1125))}>
            <Image src={photo(seed, 500, 625)} alt={`${name}, photo ${i + 2}`} width={500} height={625} />
          </figure>
        ))}
      </div>

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={open} alt="" />
        </div>
      )}
    </>
  );
}
