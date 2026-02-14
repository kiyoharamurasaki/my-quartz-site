import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import Graph from "./Graph"

export default ((opts?: any) => {
  const GraphComponent = Graph(opts)

  const CollapsibleGraph: QuartzComponent = (props: QuartzComponentProps) => {
    return (
      <div class="collapsible-graph">
        <details>
          <summary
            style={{
              cursor: "pointer",
              listStyle: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>Graph View</span>
            <span class="fold-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </summary>
          {GraphComponent(props)}
        </details>
      </div>
    )
  }

  CollapsibleGraph.css = GraphComponent.css
  CollapsibleGraph.afterDOMLoaded = `
    const details = document.querySelector('.collapsible-graph details');
    if (details) {
        details.addEventListener('toggle', (e) => {
            const icon = details.querySelector('.fold-icon svg');
            if (details.open) {
                icon.style.transform = 'rotate(90deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    }
    ${GraphComponent.afterDOMLoaded}
  `

  return CollapsibleGraph
}) satisfies QuartzComponentConstructor
