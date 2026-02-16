import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import Backlinks from "./Backlinks"
import { i18n } from "../i18n"

export default ((opts?: any) => {
    const BacklinksComponent = Backlinks(opts)

    const CollapsibleBacklinks: QuartzComponent = (props: QuartzComponentProps) => {
        const backlinksContent = BacklinksComponent(props)
        if (!backlinksContent) return null

        return (
            <div class="collapsible-backlinks">
                <details>
                    <summary
                        style={{
                            cursor: "pointer",
                            listStyle: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontWeight: "bold",
                            color: "var(--dark)",
                        }}
                    >
                        <span class="fold-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
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
                        <span>{i18n(props.cfg.locale).components.backlinks.title}</span>
                    </summary>
                    {backlinksContent}
                </details>
            </div>
        )
    }

    CollapsibleBacklinks.css = `
  .collapsible-backlinks {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--lightgray);
  }
  .collapsible-backlinks summary {
    user-select: none; 
    opacity: 1;
  }
  .collapsible-backlinks summary:hover {
    opacity: 0.8;
    color: var(--secondary);
  }
  .collapsible-backlinks .backlinks {
    margin-top: 1rem;
  }
  .collapsible-backlinks .backlinks h3 {
    display: none;
  }
  ${BacklinksComponent.css ?? ""}
  `

    CollapsibleBacklinks.afterDOMLoaded = `
    const details = document.querySelector('.collapsible-backlinks details');
    if (details) {
        const icon = details.querySelector('.fold-icon svg');
        const updateIcon = () => {
             if (details.open) {
                icon.style.transform = 'rotate(90deg)';
                icon.style.transition = 'transform 0.2s ease';
            } else {
                icon.style.transform = 'rotate(0deg)';
                icon.style.transition = 'transform 0.2s ease';
            }
        }
        
        details.addEventListener('toggle', updateIcon);
        // Initial state
        updateIcon();
    }
    ${BacklinksComponent.afterDOMLoaded ?? ""}
  `

    return CollapsibleBacklinks
}) satisfies QuartzComponentConstructor
