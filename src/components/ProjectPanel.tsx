import { useEffect, useRef, useState } from "react";
import { useUI } from "../store";
import { PANELS, PROJECTS, PROJECT_COUNT } from "../i18n/projects";
import { computeShow, currentProgress, type ShowState } from "../three/choreo";

export function ProjectPanel() {
  const lang = useUI((s) => s.lang);
  const [st, setSt] = useState<ShowState>({ index: 0, side: "right", active: false });
  const prev = useRef<ShowState>({ index: -1, side: "right", active: false });

  // drive the panel from scroll progress on its own rAF (independent of the 3D loop)
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const s = computeShow(currentProgress());
      const p = prev.current;
      if (p.index !== s.index || p.side !== s.side || p.active !== s.active) {
        prev.current = s;
        setSt(s);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const i = Math.max(0, Math.min(PROJECT_COUNT - 1, st.index));
  const panel = PANELS[lang][i];
  const proj = PROJECTS[i];

  return (
    <div className={"project-panel " + st.side + (st.active ? " on" : "")} aria-hidden>
      <div className="project-panel__inner" key={st.active ? i : "idle"}>
        <div className="project-panel__eyebrow">
          Project {proj.id} <span>/ 0{PROJECT_COUNT}</span>
        </div>
        <h3 className="project-panel__name">{panel.name}</h3>
        <div className="project-panel__tags">
          <span className="chip" style={{ borderColor: proj.screen.accent, color: proj.screen.accent }}>
            {panel.sector}
          </span>
        </div>
        <p className="project-panel__blurb">{panel.blurb}</p>
        <div className="project-panel__metrics">
          {panel.metrics.map((m) => (
            <div key={m.l}>
              <div className="project-panel__val" style={{ color: proj.screen.accent }}>
                {m.v}
              </div>
              <div className="project-panel__lbl">{m.l}</div>
            </div>
          ))}
        </div>
        <div className="project-panel__stack">{proj.stack}</div>
      </div>
    </div>
  );
}
