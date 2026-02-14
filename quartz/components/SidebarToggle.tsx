import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/sidebarToggle.scss"

export default (() => {
  const SidebarToggle: QuartzComponent = (_props: QuartzComponentProps) => {
    return (
      <div class="sidebar-toggle-container">
        <button class="sidebar-toggle" aria-label="Toggle sidebar" type="button">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </button>
      </div>
    )
  }

  SidebarToggle.css = style
  SidebarToggle.afterDOMLoaded = `
        document.addEventListener("nav", () => {
            const toggle = document.querySelector('.sidebar-toggle');
            const sidebar = document.querySelector('.right.sidebar');
            if (!toggle || !sidebar) return;

            // Close sidebar on navigation
            sidebar.classList.remove('sidebar-open');
            toggle.classList.remove('active');

            function handleToggle(e) {
                e.stopPropagation();
                sidebar.classList.toggle('sidebar-open');
                toggle.classList.toggle('active');
            }

            function handleOutsideClick(e) {
                if (!sidebar.contains(e.target) &&
                    !toggle.contains(e.target) &&
                    sidebar.classList.contains('sidebar-open')) {
                    sidebar.classList.remove('sidebar-open');
                    toggle.classList.remove('active');
                }
            }

            function handleEscape(e) {
                if (e.key === 'Escape' && sidebar.classList.contains('sidebar-open')) {
                    sidebar.classList.remove('sidebar-open');
                    toggle.classList.remove('active');
                }
            }

            toggle.addEventListener('click', handleToggle);
            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('keydown', handleEscape);

            window.addCleanup(() => {
                toggle.removeEventListener('click', handleToggle);
                document.removeEventListener('click', handleOutsideClick);
                document.removeEventListener('keydown', handleEscape);
            });
        });
    `

  return SidebarToggle
}) satisfies QuartzComponentConstructor
