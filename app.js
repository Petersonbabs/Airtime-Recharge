// =========================
// =========================
//  VARIABLES
// =========================
// =========================


// ARRAY & OBJECTS
let generatedPins = []
let singleCard;
let unUsed = []
let used = []
let {log, count, table} = console


// ELEMENTS
let pinEl = document.getElementById('generated-pin')
let networkInput = document.getElementById('select-network')
let amountInput = document.getElementById('select-amount')
const modal = document.querySelector('.modal')
let modalText = document.getElementById('modal-text')
let insertPin = document.getElementById('insert-pin')
let tableEl = document.querySelector('tbody')
let copiedEl = document.getElementById('copied-el')
let copiedPin;

let date = new Date()
let day = date.getDate()
let month = date.getMonth()
let year = date.toDateString()


// BUTTONS
let generateBtn = document.getElementById('generate-btn').addEventListener('click', function(){
    generate()
})


let rechargeBtn = document.getElementById('recharge-btn').addEventListener('click', function(){
    recharge()
})

let okayBtn = document.querySelector('.okay-btn').addEventListener('click', function(){
    modal.style.display = 'none'
})

let copyBtn = document.getElementById('copy-btn').addEventListener('click', function(){
    if (pinEl.value) {
        copiedPin = pinEl.value
        copiedEl.style.display = 'block'
        pinEl.value = ''

        setTimeout(function(){
            copiedEl.style.display = 'none'
        }, 3000)
        
    }
})

document.getElementById('paste-btn').addEventListener('click', function(){
    insertPin.value = copiedPin
})

// =========================
// =========================
//  END OF VARIABLES
// =========================
// =========================











// =========================
// =========================
//  FUNCTIONS
// =========================
// =========================

// generate random number
function generate() {
    
    let random; 
    
    
    
    // generate only if network and amount is selected
    if (networkInput.value == 'select-network') {
        modal.style.display = 'flex'
        modalText.textContent = 'you have not select any network'
    } else if (amountInput.value == 'select-amount') {
        modal.style.display = 'flex'
        modalText.textContent = 'you have not select any amount'
    } else {
        random = Math.floor(Math.random() * 9999999999999)
        pinEl.value = `*333*${random}#`
        pinEl.style.fontWeight = 'bold'


        singleCard = {
            Network: networkInput.value,
            amount: amountInput.value,
            date: `${year} `,
            pin: random,
            printRef: pinEl.value,
            status: 'unused'
        }

        
        unUsed.push(singleCard.printRef)
        log(unUsed)
        generatedPins.push(singleCard)
        localStorage.setItem('generatedpins', JSON.stringify(generatedPins))
        display()
        
        
        
       

    }

}

// DISPLAY
function display() {
    tableEl.innerHTML = ''
    generatedPins.forEach(function(ele, i){
        

        tableEl.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${ele.Network}</td>
            <td>${ele.date}</td>
            <td>${ele.amount}</td>
            <td>${ele.pin}</td>
            <td>${ele.printRef}</td>
            <td>${ele.status}</td>
            <td><button onclick="del(${i})">delete</button></td>
            
        </tr>
        
    `

    
   
    
    })
}
// END OF DISPLAY


function save() {
    if (localStorage.getItem('generatedpins')){
        
        generatedPins = JSON.parse(localStorage.getItem('generatedpins'))
        display()
    }
}


save()


function del(i) {
    generatedPins.splice(i, 1)
    localStorage.setItem('generatedpins', JSON.stringify(generatedPins))
    display()
            
    
}






// RECHARGE CARD
function recharge(){

    let pin = insertPin.value
    generatedPins.forEach(function(ele, i){

        let currentCard = generatedPins[i]

        if (pin == currentCard.printRef){

            if (currentCard.status == 'unused') {
                modal.style.display = 'flex'
                modalText.textContent = "recharge successful!"
                unUsed.splice(pin, 1)
                used.push(pin)
    
                currentCard.status = 'used'
                localStorage.setItem('generatedpins', JSON.stringify(generatedPins))
                display()
            } 
             else if (currentCard.status == "used") {
                modal.style.display = 'flex'
                modalText.textContent = "Sorry, this card has been used!"
            } 

        } else if (pin == ''){
            modal.style.display = 'flex'
            modalText.textContent = "insert pin!"
    
        } 

        

    })
        
     

   
    
    

}

// =========================
// =========================
//  END OF FUNCTIONS
// =========================
// =========================