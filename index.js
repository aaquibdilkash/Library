console.log('This is index.js')

//constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display construction
function Display() {

}

//Add method to display prototypes
Display.prototype.add = function (book) {
    console.log('adding to UI')
    let tableBody = document.getElementById('tableBody')
    let uistring = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;

    tableBody.innerHTML += uistring;
}

//implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm')
    libraryForm.reset()
}

//implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false
    } else {
        return true
    }
}


//Display the show function
Display.prototype.show = function (type, msg) {
    let message = document.getElementById('message')
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong>${msg}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`
    setTimeout(() => {
        message.innerHTML = ""
    }, 5000);
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm')
libraryForm.addEventListener('submit', libraryFormSubmit)

function libraryFormSubmit(e) {
    console.log('You have submitted library form')
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type

    let scifi = document.getElementById('scifi');
    let fantasy = document.getElementById('fantasy');
    let timeTravel = document.getElementById('timeTravel');


    if (scifi.checked) {
        type = scifi.value
    } else if (fantasy.checked) {
        type = fantasy.value
    } else if (timeTravel.checked) {
        type = timeTravel.value
    }
    let book = new Book(name, author, type)
    console.log(book)


    let display = new Display()

    if (display.validate(book)) {

        display.add(book)
        display.clear()
        display.show('success', " Your book has been successfully added")
    } else {
        //show error
        display.show('danger', " Sorry you can't add this book")
    }

    e.preventDefault()
}