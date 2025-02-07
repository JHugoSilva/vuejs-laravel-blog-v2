import Swal from 'sweetalert2/dist/sweetalert2.js'

export function confirmDelation() {
    return new Promise((resolve, reject) => {

        Swal.fire({
            title: 'Are your sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085D6',
            cancelButtonColor: '#D33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Swal.fire({
                //     title: 'Deleted',
                //     text: 'Your file has been deleted',
                //     icon: 'success'
                // })
                
                resolve(result.isConfirmed)
            } else {
                reject()
            }
        })
    })
}