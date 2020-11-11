document.addEventListener("DOMContentLoaded", ()=> {
	let slime = document.querySelector('.slime')
	let slimeRect = document.querySelector('.slime').getBoundingClientRect()
	let root = document.querySelector('.root')
	
	function moveAndSlime(rootElement, alignChildren, inset = true, outset = true) {
		//alignChildren - выравнивание по часовой стрелке слева на право
		//rootElement - корневой элемент
		
		let rootRect = rootElement.getBoundingClientRect()
		let rootChildren = rootElement.children
		slime.onpointerenter = () => {
		slime.style.cursor = 'grab'
	}
	
	rootElement.onpointerdown = (e) => {
		e.target.style.cursor = 'grabbing'
		//на первый план таргет
		e.target.style.zIndex = 1
		//отсальное на второй
		for (let i=0; i<rootChildren.length; i++) {
			if (rootChildren[i]!=e.target) {rootChildren[i].style.zIndex = 0}
		}						
		
		rootElement.onpointermove = (e) => {
			e.target.style.left = (e.clientX - e.target.offsetWidth/2) + 'px'
			e.target.style.top = (e.clientY - e.target.offsetHeight/2) + 'px'
			
			//checkslime
			function checkSlime(elem, direction, align) {
				let elemRect = elem.getBoundingClientRect()
				
				if (direction === 'inset') {
					//left-right
					if ((e.clientX + e.target.offsetWidth/2 + 50) > elemRect.right) {
						e.target.style.left = elemRect.right - e.target.offsetWidth + 'px'
					}
					if ((e.clientX - e.target.offsetWidth/2 - 50) < elemRect.x) {
						e.target.style.left = elemRect.x + 'px'
					}
					//top-bottom
					if ((e.clientY + e.target.offsetHeight/2 + 50) > elemRect.width) {
						e.target.style.top = elemRect.width - e.target.offsetHeight + 'px'
					}
					if ((e.clientY - e.target.offsetHeight/2 - 50) < elemRect.y) {
						e.target.style.top = elemRect.y + 'px'
					}				
				}
				else if (direction==='outset' && elem!=e.target) {
					//left-right
					if ((e.clientX + e.target.offsetWidth/2 + 50) > elemRect.left && (e.clientX + e.target.offsetWidth/2 + 50) < (elemRect.left + 50) && e.clientY > elemRect.top && e.clientY < elemRect.bottom) {
						e.target.style.left = elemRect.x  - e.target.offsetWidth + 'px'
						if (alignChildren==='right') {e.target.style.top = elemRect.top + 'px'}
						if (alignChildren==='left') {e.target.style.top = elemRect.bottom - e.target.offsetHeight + 'px'}
						if (alignChildren==='center') {e.target.style.top = elemRect.top + ((elemRect.height - e.target.offsetHeight)/2) + 'px'}
					}
					if ((e.clientX - e.target.offsetWidth/2 - 50) < elemRect.right && (e.clientX - e.target.offsetWidth/2 - 50) > (elemRect.right - 50) && e.clientY > elemRect.top && e.clientY < elemRect.bottom) {
						e.target.style.left = elemRect.right + 'px'
						if (alignChildren==='left') {e.target.style.top = elemRect.top + 'px'}
						if (alignChildren==='right') {e.target.style.top = elemRect.bottom - e.target.offsetHeight + 'px'}
						if (alignChildren==='center') {e.target.style.top = elemRect.top + ((elemRect.height - e.target.offsetHeight)/2) + 'px'}
					}
					
					//top-bottom
					if ((e.clientY + e.target.offsetHeight/2 + 50) > elemRect.top && (e.clientY + e.target.offsetHeight/2 + 50) < elemRect.top + 50 && e.clientX > elemRect.left && e.clientX < elemRect.right) {
						e.target.style.top = elemRect.top - e.target.offsetHeight + 'px'
						if (alignChildren==='left') {e.target.style.left = elemRect.left + 'px'}
						if (alignChildren==='right') {e.target.style.left = elemRect.right - e.target.offsetWidth + 'px'}
						if (alignChildren==='center') {e.target.style.left = elemRect.left + ((elemRect.width - e.target.offsetWidth)/2) + 'px'}
					}
					if ((e.clientY - e.target.offsetHeight/2 - 50) < elemRect.bottom && (e.clientY - e.target.offsetHeight/2 - 50) > elemRect.bottom - 50 && e.clientX > elemRect.left && e.clientX < elemRect.right) {
						e.target.style.top = elemRect.bottom + 'px'
						if (alignChildren==='right') {e.target.style.left = elemRect.left + 'px'}
						if (alignChildren==='left') {e.target.style.left = elemRect.right - e.target.offsetWidth + 'px'}
						if (alignChildren==='center') {e.target.style.left = elemRect.left + ((elemRect.width - e.target.offsetWidth)/2) + 'px'}
					}		
				}
			}
			//for root
			inset ? checkSlime(rootElement, 'inset'): null
			//for children
			if (outset) {
				for (let i=0; i<rootChildren.length; i++) {
					checkSlime(rootChildren[i], 'outset')
				}						
			}
		}
		}
		rootElement.onpointerup = (e) => {
			rootElement.onpointermove = null
			e.target.style.cursor = 'grab'
		}
	}
	moveAndSlime(root, 'center')
	
});