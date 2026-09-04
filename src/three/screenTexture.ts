import * as THREE from "three";
import { PROJECTS, type ScreenSpec } from "../i18n/projects";

/**
 * Draws a project's UI (or the final ETEREO console) onto a SQUARE canvas mapped
 * to the MacBook screen. The screen mesh rotates the texture 90° + mirrors it, so
 * everything is drawn inside a pre-transform that cancels that out.
 */

const SIZE = 1200;
const CANVAS_ROT = (3 * Math.PI) / 2;
const MIRROR = true;
const FIT = 0.72;

// logical landscape drawing area, centred in the square canvas
const W = 1200;
const H = 760;
const OY = (SIZE - H) / 2;

const TEXT = "#eef1fb";
const MUT = "#8b93ab";

function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export function makeScreenTexture(): { texture: THREE.CanvasTexture; draw: (idx: number | "final") => void } {
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;

  function rr(x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function bg(accent: string) {
    const g = ctx.createLinearGradient(0, 0, 0, SIZE);
    g.addColorStop(0, "#0a0e1c");
    g.addColorStop(1, "#070a16");
    ctx.fillStyle = g;
    ctx.fillRect(-SIZE, -SIZE, SIZE * 3, SIZE * 3);
    const rg = ctx.createRadialGradient(OY + W * 0.82, OY + 60, 0, OY + W * 0.82, OY + 60, 560);
    rg.addColorStop(0, hexA(accent, 0.26));
    rg.addColorStop(1, hexA(accent, 0));
    ctx.fillStyle = rg;
    ctx.fillRect(-SIZE, -SIZE, SIZE * 3, SIZE * 3);
  }

  function header(s: ScreenSpec, badge: string) {
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.fillRect(0, 0, W, 58);
    ctx.fillStyle = "rgba(255,255,255,0.14)";
    [30, 54, 78].forEach((cx) => {
      ctx.beginPath();
      ctx.arc(cx, 29, 5.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.font = "500 22px monospace";
    ctx.fillStyle = MUT;
    ctx.fillText(`etereo / ${s.title.toLowerCase().replace(/\s+/g, "-")}`, 116, 37);
    ctx.textAlign = "right";
    ctx.fillText("17:19:50", W - 30, 37);
    ctx.textAlign = "left";

    ctx.font = "600 16px monospace";
    ctx.fillStyle = MUT;
    ctx.fillText(s.subtitle.toUpperCase(), 44, 116);
    rr(W - 150, 92, 108, 36, 9);
    ctx.fillStyle = hexA(s.accent, 0.9);
    ctx.fill();
    ctx.font = "600 18px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(badge, W - 96, 116);
    ctx.textAlign = "left";

    ctx.font = "600 46px sans-serif";
    ctx.fillStyle = TEXT;
    ctx.fillText(s.title, 44, 172);
  }

  function kpis(s: ScreenSpec, y: number) {
    const tw = (W - 88 - 40) / 3;
    s.kpis.forEach((k, i) => {
      const tx = 44 + i * (tw + 20);
      rr(tx, y, tw, 96, 13);
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.fill();
      ctx.font = "600 36px sans-serif";
      ctx.fillStyle = i === 1 ? s.accent : TEXT;
      ctx.fillText(k.v, tx + 20, y + 52);
      ctx.font = "400 16px sans-serif";
      ctx.fillStyle = MUT;
      ctx.fillText(k.l, tx + 20, y + 80);
    });
  }

  function opsTemplate(s: ScreenSpec) {
    header(s, "Live");
    let y = 210;
    s.rows.forEach((label, i) => {
      const active = i === 1;
      const pct = [1, 0.62, 0.3, 0.12][i] ?? 0.2;
      rr(44, y, W - 88, 60, 13);
      ctx.fillStyle = active ? hexA(s.accent, 0.1) : "rgba(255,255,255,0.02)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(82, y + 30, 16, 0, Math.PI * 2);
      ctx.fillStyle = active ? s.accent : "rgba(255,255,255,0.06)";
      ctx.fill();
      ctx.font = "600 15px monospace";
      ctx.fillStyle = active ? "#fff" : MUT;
      ctx.textAlign = "center";
      ctx.fillText("0" + (i + 1), 82, y + 35);
      ctx.textAlign = "left";
      ctx.font = "500 23px sans-serif";
      ctx.fillStyle = TEXT;
      ctx.fillText(label, 116, y + 38);
      const bx = W - 330,
        bw = 220;
      rr(bx, y + 26, bw, 8, 4);
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fill();
      rr(bx, y + 26, bw * pct, 8, 4);
      ctx.fillStyle = s.accent;
      ctx.fill();
      y += 68;
    });
    kpis(s, y + 6);
  }

  function analyticsTemplate(s: ScreenSpec) {
    header(s, "Analytics");
    const bx = 44,
      by = 220,
      bw = W - 88,
      bh = 230;
    rr(bx, by, bw, bh, 14);
    ctx.fillStyle = "rgba(255,255,255,0.02)";
    ctx.fill();
    const bars = [0.4, 0.62, 0.5, 0.78, 0.68, 0.9, 0.72, 0.84, 0.6];
    const n = bars.length;
    const gap = 22;
    const w2 = (bw - 80 - gap * (n - 1)) / n;
    bars.forEach((v, i) => {
      const x = bx + 40 + i * (w2 + gap);
      const hh = (bh - 80) * v;
      const yy = by + bh - 40 - hh;
      rr(x, yy, w2, hh, 8);
      const g = ctx.createLinearGradient(0, yy, 0, yy + hh);
      g.addColorStop(0, hexA(s.accent, 0.95));
      g.addColorStop(1, hexA(s.accent, 0.35));
      ctx.fillStyle = i === n - 2 ? g : hexA(s.accent, 0.28);
      ctx.fill();
    });
    // legend chips
    ctx.font = "500 18px monospace";
    let lx = 44;
    const y2 = by + bh + 40;
    s.rows.forEach((r) => {
      const wch = ctx.measureText(r).width + 34;
      rr(lx, y2 - 20, wch, 30, 15);
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(lx + 16, y2 - 5, 5, 0, Math.PI * 2);
      ctx.fillStyle = s.accent;
      ctx.fill();
      ctx.fillStyle = MUT;
      ctx.fillText(r, lx + 28, y2);
      lx += wch + 14;
    });
    kpis(s, y2 + 30);
  }

  function mobileTemplate(s: ScreenSpec) {
    header(s, "Mobile");
    // phone frame centred
    const pw = 300,
      ph = 470;
    const px = W / 2 - pw / 2,
      py = 205;
    rr(px, py, pw, ph, 34);
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fill();
    rr(px + 12, py + 12, pw - 24, ph - 24, 26);
    ctx.fillStyle = "#0b1020";
    ctx.fill();
    // notch
    rr(px + pw / 2 - 40, py + 20, 80, 16, 8);
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fill();
    // app header
    ctx.font = "600 22px sans-serif";
    ctx.fillStyle = TEXT;
    ctx.fillText(s.title, px + 30, py + 72);
    // list rows
    let ry = py + 100;
    s.rows.forEach((r, i) => {
      rr(px + 22, ry, pw - 44, 56, 12);
      ctx.fillStyle = i === 0 ? hexA(s.accent, 0.16) : "rgba(255,255,255,0.03)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px + 48, ry + 28, 12, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? s.accent : "rgba(255,255,255,0.12)";
      ctx.fill();
      ctx.font = "500 18px sans-serif";
      ctx.fillStyle = i === 0 ? TEXT : MUT;
      ctx.fillText(r, px + 74, ry + 34);
      ry += 66;
    });
    // bottom tab bar
    rr(px + 22, py + ph - 60, pw - 44, 44, 14);
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fill();
    [0, 1, 2, 3].forEach((i) => {
      ctx.beginPath();
      ctx.arc(px + 60 + i * 60, py + ph - 38, 7, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? s.accent : "rgba(255,255,255,0.2)";
      ctx.fill();
    });
    // side KPIs
    const ky = 250;
    s.kpis.forEach((k, i) => {
      const yy = ky + i * 150;
      ctx.font = "600 40px sans-serif";
      ctx.fillStyle = i === 0 ? s.accent : TEXT;
      ctx.textAlign = "right";
      ctx.fillText(k.v, W - 60, yy);
      ctx.font = "400 16px sans-serif";
      ctx.fillStyle = MUT;
      ctx.fillText(k.l, W - 60, yy + 26);
      ctx.textAlign = "left";
    });
  }

  function mapTemplate(s: ScreenSpec) {
    header(s, "Live");
    const mx = 44,
      my = 205,
      mw = W - 88,
      mh = 330;
    rr(mx, my, mw, mh, 14);
    ctx.fillStyle = "rgba(255,255,255,0.02)";
    ctx.fill();
    ctx.save();
    ctx.beginPath();
    rr(mx, my, mw, mh, 14);
    ctx.clip();
    // faint grid
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let gx = mx; gx < mx + mw; gx += 60) {
      ctx.beginPath();
      ctx.moveTo(gx, my);
      ctx.lineTo(gx, my + mh);
      ctx.stroke();
    }
    for (let gy = my; gy < my + mh; gy += 60) {
      ctx.beginPath();
      ctx.moveTo(mx, gy);
      ctx.lineTo(mx + mw, gy);
      ctx.stroke();
    }
    // nodes
    const nodes = [
      [mx + 160, my + 120],
      [mx + 380, my + 220],
      [mx + 560, my + 90],
      [mx + 760, my + 190],
      [mx + 900, my + 110],
      [mx + 300, my + 280],
      [mx + 680, my + 280],
    ];
    ctx.strokeStyle = hexA(s.accent, 0.4);
    ctx.lineWidth = 2;
    const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [3, 6], [1, 3]];
    edges.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(nodes[a][0], nodes[a][1]);
      ctx.lineTo(nodes[b][0], nodes[b][1]);
      ctx.stroke();
    });
    nodes.forEach((nd, i) => {
      ctx.beginPath();
      ctx.arc(nd[0], nd[1], i === 1 ? 12 : 7, 0, Math.PI * 2);
      ctx.fillStyle = i === 1 ? s.accent : "rgba(255,255,255,0.5)";
      ctx.fill();
      if (i === 1) {
        ctx.beginPath();
        ctx.arc(nd[0], nd[1], 22, 0, Math.PI * 2);
        ctx.strokeStyle = hexA(s.accent, 0.6);
        ctx.stroke();
      }
    });
    ctx.restore();
    // row labels as tags under map
    ctx.font = "500 17px monospace";
    let lx = 44;
    s.rows.forEach((r) => {
      const wch = ctx.measureText(r).width + 34;
      rr(lx, my + mh + 20, wch, 30, 15);
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.fill();
      ctx.fillStyle = MUT;
      ctx.fillText(r, lx + 17, my + mh + 40);
      lx += wch + 14;
    });
    kpis(s, my + mh + 66);
  }

  function finalConsole() {
    const s: ScreenSpec = {
      template: "ops",
      accent: "#6d54f0",
      title: "Delivery Console",
      subtitle: "Active engagement",
      kpis: [
        { v: "99.98%", l: "Uptime, 90d" },
        { v: "31/wk", l: "Releases" },
        { v: "0", l: "Rollbacks" },
      ],
      rows: ["Discovery & audit", "Target architecture", "Migration & build", "Handover & run"],
    };
    opsTemplate(s);
  }

  function render(idx: number | "final") {
    const accent = idx === "final" ? "#6d54f0" : PROJECTS[idx % PROJECTS.length].screen.accent;
    bg(accent);
    ctx.save();
    ctx.translate(0, OY);
    if (idx === "final") {
      finalConsole();
    } else {
      const s = PROJECTS[idx % PROJECTS.length].screen;
      if (s.template === "ops") opsTemplate(s);
      else if (s.template === "analytics") analyticsTemplate(s);
      else if (s.template === "mobile") mobileTemplate(s);
      else mapTemplate(s);
    }
    ctx.restore();
  }

  function draw(idx: number | "final") {
    const wd = window as unknown as { __CROT?: number; __CMIR?: boolean; __FIT?: number };
    const rot = typeof wd.__CROT === "number" ? wd.__CROT : CANVAS_ROT;
    const mir = typeof wd.__CMIR === "boolean" ? wd.__CMIR : MIRROR;
    const fit = typeof wd.__FIT === "number" ? wd.__FIT : FIT;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.translate(SIZE / 2, SIZE / 2);
    ctx.rotate(rot);
    if (mir) ctx.scale(-1, 1);
    ctx.scale(fit, fit);
    ctx.translate(-SIZE / 2, -SIZE / 2);
    render(idx);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  draw(0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return { texture, draw };
}
