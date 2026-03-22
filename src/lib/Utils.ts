export function offclick(callback: (this_element: Element, clicked_element: Element) => any) {
    return (el: Element) => {
        const cb = (event: Event) => {
            if (el.getAttribute("inert")) {
                return;
            }
            callback(el, event.target as Element);
        }
        setTimeout(() => {
            window.addEventListener("click", cb);
        }, 1);
        return () => {
            window.removeEventListener("click", cb);
        }
    }
}
