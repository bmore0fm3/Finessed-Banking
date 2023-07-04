//Controller function
function getValues() {
    let loanAmount = document.getElementById("loanAmount").value;
    let termInMonths = document.getElementById("loanTerm").value;
    let interestRate = document.getElementById("interestRate").value;

    //Build an array of amorizitation data
    let dataRows = getData(loanAmount, termInMonths, interestRate);

    //Display the data in a table
    //console.log(dataRows);
    displayAmoritization(dataRows);


    return; 
}


//logic function
function getData(loanAmount, termInMonths, interestRate) {
    let dataRows = [];
    let month = 0;
    let totalMonthlyPayment = 0;
    let remainingBalance = loanAmount;
    let accruedInterest = 0;


    for (let index = 0; index < termInMonths; index++) {
        month += 1; 

        //Calculate interest payment 
        monthlyInterestPayment = remainingBalance * (interestRate/1200);
        monthlyInterestPayment = Number((monthlyInterestPayment).toFixed(2));

        //calculate accrued interest
        accruedInterest = accruedInterest + monthlyInterestPayment;
        accruedInterest = Number((accruedInterest).toFixed(2));

        //Calculate the monthly payment 
        totalMonthlyPayment = (remainingBalance) * (interestRate / 1200) / (1 - Math.pow((1 + interestRate / 1200), -termInMonths));
        totalMonthlyPayment = Number((totalMonthlyPayment).toFixed(2));

        //Calculate Principal payment 
        principalPayment = totalMonthlyPayment - monthlyInterestPayment;
        principalPayment = Number((principalPayment).toFixed(2));

        //calculate remaining balance
        remainingBalance = remainingBalance - principalPayment;
        remainingBalance = Number((remainingBalance).toFixed(2));

        dataRows.push(month, totalMonthlyPayment, principalPayment, monthlyInterestPayment, accruedInterest, remainingBalance);

    }

    return dataRows;
}


//Display Function
function displayAmoritization(dataRows){
    // let templateRows = " ";
    // for (let index = 0; index < dataRows.length; index++) {
    //     let amorizitation = dataRows[index];
    //     templateRows += `<tr><td>${amorizitation}</td></tr>`
        

        
    // }
    // document.getElementById("results").innerHTML = templateRows;


    //Get the table body element from the page 
    let tableBody = document.getElementById("results");

    //get the template row
    let templateRow = document.getElementById("fbTemplate");

    //clear the table first
    tableBody.innerHTML = ""; 
    
    for (let index = 0; index < dataRows.length; index += 6) {
        let tableRow =  document.importNode(templateRow.content, true);

        let rowCols = tableRow.querySelectorAll("td");
        rowCols[0].textContent = dataRows[index];

        rowCols[1].textContent = dataRows[index + 1];

        rowCols[2].textContent = dataRows[index + 2];

        rowCols[3].textContent = dataRows[index + 3];

        rowCols[4].textContent = dataRows[index + 4];

        rowCols[5].textContent = dataRows[index + 5];
        
        tableBody.appendChild(tableRow);
        
    }
}