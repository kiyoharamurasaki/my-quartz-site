import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, simplifySlug } from "../util/path"
import { i18n } from "../i18n"

const INITIAL_SHOW_COUNT = 5

export default (() => {
  const CollapsibleBacklinks: QuartzComponent = ({
    fileData,
    allFiles,
    cfg,
  }: QuartzComponentProps) => {
    const slug = simplifySlug(fileData.slug!)
    const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug))

    if (backlinkFiles.length === 0) return null

    const visibleBacklinks = backlinkFiles.slice(0, INITIAL_SHOW_COUNT)
    const hiddenBacklinks = backlinkFiles.slice(INITIAL_SHOW_COUNT)
    const hasMore = hiddenBacklinks.length > 0

    return (
      <div class="collapsible-backlinks">
        <details>
          <summary>
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
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
            <span>
              {i18n(cfg.locale).components.backlinks.title}
              <span class="backlinks-count">({backlinkFiles.length})</span>
            </span>
          </summary>
          <ul class="backlinks-list">
            {visibleBacklinks.map((f) => (
              <li>
                <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                  {f.frontmatter?.title}
                </a>
              </li>
            ))}
          </ul>
          {hasMore && (
            <div class="backlinks-more-wrapper">
              <button class="backlinks-more-btn" type="button">
                more ({hiddenBacklinks.length})
              </button>
              <ul class="backlinks-list backlinks-hidden-list">
                {hiddenBacklinks.map((f) => (
                  <li>
                    <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                      {f.frontmatter?.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: var(--dark);
    user-select: none;
  }
  .collapsible-backlinks summary::-webkit-details-marker {
    display: none;
  }
  .collapsible-backlinks summary:hover {
    opacity: 0.8;
    color: var(--secondary);
  }
  .backlinks-count {
    font-size: 0.8rem;
    opacity: 0.5;
    margin-left: 0.3rem;
    font-weight: 400;
  }
  .backlinks-list {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0 0;
  }
  .backlinks-list li {
    padding: 0.2rem 0;
  }
  .backlinks-list a.internal {
    background-color: transparent;
  }
  .backlinks-hidden-list {
    display: none;
  }
  .backlinks-hidden-list.show {
    display: block;
  }
  .backlinks-more-btn {
    background: none;
    border: 1px solid var(--lightgray);
    border-radius: 4px;
    color: var(--secondary);
    cursor: pointer;
    font-size: 0.8rem;
    padding: 0.3rem 0.8rem;
    margin-top: 0.3rem;
    transition: all 0.2s ease;
  }
  .backlinks-more-btn:hover {
    background: var(--highlight);
    color: var(--tertiary);
  }
  .backlinks-more-btn.expanded {
    display: none;
  }
  `

  CollapsibleBacklinks.afterDOMLoaded = `
    document.addEventListener('click', (e) => {
      // Fold icon rotation
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
        };
        details.addEventListener('toggle', updateIcon);
        updateIcon();
      }

      // "more" button
      const moreBtn = e.target.closest('.backlinks-more-btn');
      if (moreBtn) {
        const wrapper = moreBtn.closest('.backlinks-more-wrapper');
        const hiddenList = wrapper.querySelector('.backlinks-hidden-list');
        hiddenList.classList.add('show');
        moreBtn.classList.add('expanded');
      }
    });
  `

  return CollapsibleBacklinks
}) satisfies QuartzComponentConstructor
