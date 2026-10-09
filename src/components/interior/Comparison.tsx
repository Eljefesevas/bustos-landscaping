"use client";
import { useId, useState } from 'react';
import Image from 'next/image';
import { MoveHorizontal } from 'lucide-react';
import type { Photo } from '@/lib/projects';

/* Before/after slider. Only used for photo pairs taken from the same position on the same job. */
export default function Comparison({ before, after, label, sizes = '(max-width: 860px) 100vw, 60vw' }: { before: Photo; after: Photo; label: string; sizes?: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <figure className="ip-compare">
      <div className="ip-compare-frame">
        <Image src={after.src} alt={after.alt} fill sizes={sizes} />
        <div className="ip-compare-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before.src} alt={before.alt} fill sizes={sizes} />
        </div>
        <span className="ip-compare-tag ip-compare-tag-before" aria-hidden="true">Before</span>
        <span className="ip-compare-tag ip-compare-tag-after" aria-hidden="true">After</span>
        <span className="ip-compare-handle" style={{ left: `${pos}%` }} aria-hidden="true"><MoveHorizontal size={20} /></span>
        <input
          id={id}
          type="range" min={0} max={100} step={1} value={pos}
          onChange={e => setPos(Number(e.target.value))}
          aria-label={`${label}: drag to compare before and after`}
          aria-valuetext={`${pos}% before, ${100 - pos}% after`}
        />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
