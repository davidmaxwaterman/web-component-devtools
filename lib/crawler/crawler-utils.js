import { SELECTED_ELEMENT } from './crawler-constants';

export function getCurrentSelectedElement() {
    return window[SELECTED_ELEMENT];
}

/**
 * Check if element is defined in the window context it is
 * placed into. This needs to be done since the element could be inside a
 * iframe.
 *
 * @param {HTMLElement} element
 */
export function elementIsDefined(element) {
    const elementDocument = element.ownerDocument;
    const elementWindow = elementDocument.defaultView;

    return typeof elementWindow.customElements.get(element.nodeName.toLowerCase()) !== 'undefined';
}

/**
 * @param {HTMLElement} element
 */
export function getElementDeclaration(element) {
    const elementDocument = element.ownerDocument;
    const elementWindow = elementDocument.defaultView;
    return elementWindow.customElements.get(element.nodeName.toLowerCase());
}

/**
 * @param {Function} callback
 */
export function throttle(callback) {
    if (crawlerIsThrottling) return;
    crawlerIsThrottling = true;
    setTimeout(() => {
        callback();
        crawlerIsThrottling = false;
    }, 250);
}

/**
 * @param {Node | Element} node
 */
export function buildNodeText(node) {
    let nodeText = `<${node.nodeName.toLowerCase()}`;
    // @ts-ignore
    const attributes = node.attributes ?? [];
    for (const attr of attributes) {
        let val = attr.value;
        if (val != null && val.length === 0) {
            val = "";
        } else {
            val = `="${attr.value}"`
        }
        nodeText += ` ${attr.name}${val}`;
    }
    nodeText += '>';
    return nodeText;
}

export function buildFunctionText(fun) {
    const funcName = fun.name;
    if (typeof funcName === 'function') return 'Proxy';
    return fun.name.length > 0 ? fun.name : 'Anonymous function';
}


let crawlerIsThrottling = false;

export const crawlerUtilsInject = `
let crawlerIsThrottling = false;
${throttle.toString()}
${getCurrentSelectedElement.toString()}
${elementIsDefined.toString()}
${getElementDeclaration.toString()}
${buildNodeText.toString()}
${buildFunctionText.toString()}
`;
