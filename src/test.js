'use strict';

const cursorContainer = document.querySelector('.cursor-container');
const cursor = document.querySelector('.cursor-icon');

cursorContainer.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX+'px';
    cursor.style.top = e.clientY+'px';
})
