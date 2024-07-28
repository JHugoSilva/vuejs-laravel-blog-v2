
export function myDebounce(func:any, delay:number) {

    let debounceTimer:number|undefined

    return function(...args:any[]) {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(()=>func(...args), delay)
    }
}

export function openModal(el:string, postId:number) {

    return new Promise<number>((resolve)=>{
        let modal = document.getElementById(el) as HTMLElement
    
        if (modal) {
    
            setTimeout(function(){
                modal.classList.add('fade', 'show')
                modal.style.display = 'block'
                modal.classList.add('in')
            },500)
    
            document.body.classList.add('modal-open')
    
            let modalBackdrop = document.createElement('div')
            modalBackdrop.className = 'modal-backdrop fade show'
            document.body.appendChild(modalBackdrop)
        }
        resolve(postId)
    })
}

export function closeModal(el:string) {

    const modal = document.getElementById(el) as HTMLElement
    const modalBackdrop = document.querySelector('.modal-backdrop')

    if (modal) {
        modal.classList.remove('in', 'show', 'fade')
        modal.style.display = ''

        document.body.classList.remove('modal-open')

        if (modalBackdrop) {
            document.body.removeChild(modalBackdrop)
        }
    }
}