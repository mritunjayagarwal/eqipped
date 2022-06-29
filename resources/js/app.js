import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'
import { initAdmin1 } from './admin_user'
import { initAdmin2 } from './admin_product'
import moment from 'moment'


let addToCart = document.querySelectorAll('.add-to-cart')
let subToCart = document.querySelectorAll('.sub-to-cart')
let removeToCart = document.querySelectorAll('.remove-to-cart')
let subCat = document.querySelectorAll('.sub-cat')
let cartCounter = document.querySelector('#cartCounter')





addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let chai = JSON.parse(btn.dataset.chai)
        updateCart(chai)
    })
})


subToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let chai = JSON.parse(btn.dataset.chai)
        deUpdateCart(chai)
    })
})


removeToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let chai = JSON.parse(btn.dataset.chai)
        removeUpdateCart(chai)
    })
})


subCat.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let nashta = JSON.parse(btn.dataset.chai)
        subcat(nashta)
    })
})



function subcat(nashta){
    axios.post('/sub-categories', nashta).then(res => {
        console.log("hoke agya hu me");  
    })
}

function removeUpdateCart(chai){
    axios.post('/remove-cart', chai).then(res => {
        cartCounter.innerText = res.data.totalQty;
        
        new Noty({
            type:'error',
            timeout: 1000,
            progressBar: false,
            text: 'Items remove from cart'
        }).show();
    }).catch(err => {
        new Noty({
            type:'error',
            timeout: 1000,
            progressBar: false,
            text: 'Something went wrong'
        }).show();
    })

    location.reload()
}



function updateCart(chai){
    axios.post('/update-cart', chai).then(res => {
        cartCounter.innerText = res.data.totalQty;

        new Noty({
            type:'success',
            timeout: 1000,
            progressBar: false,
            text: 'Item added to cart'
        }).show();
    }).catch(err => {
        new Noty({
            type:'error',
            timeout: 1000,
            progressBar: false,
            text: 'Something went wrong'
        }).show();
    })

    location.reload()
}


function deUpdateCart(chai){
    axios.post('/de-update-cart', chai).then(res => {
        cartCounter.innerText = res.data.totalQty;
        
        if(res.data.specificQty > 1){
            // new Noty({
            //     type:'error',
            //     timeout: 1000,
            //     progressBar: false,
            //     text: 'Item remove from cart'
            // }).show();
        }
        else{
            new Noty({
                type:'warning',
                timeout: 1000,
                progressBar: false,
                text: 'Use remove button to remove item from cart'
            }).show();
        }
    })
    
    location.reload()
}




 const alertMsg = document.querySelector('#success-alert')
 if(alertMsg){
     setTimeout(() => {
         alertMsg.remove()
     }, 2000)
 }



// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}

updateStatus(order);

// Socket
let socket = io()
initAdmin(socket)

let socket1 = io()
initAdmin1(socket)

let socket2 = io()
initAdmin2(socket)

//join
if(order) {
    socket.emit('join', `order_${order._id}`)
}

let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')) {
    socket.emit('join', 'adminRoom')
}


socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    console.log(data);
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
    }).show();
})


const body = document.querySelector("body"),
sidebar = body.querySelector("nav"),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-oyo")
toggle.addEventListener("click", () => {
sidebar.classList.toggle("close");
});

searchBtn.addEventListener("click", () => {
sidebar.classList.add("close");
});
