let startBtn                = document.getElementById('start'), 
    budgetValue             = document.querySelector('.budget-value'),
    dayBudgetValue          = document.querySelector('.daybudget-value'),
    levelValue              = document.querySelector('.level-value'),
    expensesValue           = document.querySelector('.expenses-value'),
    optionalExpensesValue   = document.querySelector('.optionalexpenses-value'),
    incomeValue             = document.querySelector('.income-value'),
    monthSavingsValue       = document.querySelector('.monthsavings-value'),
    yearSavingsValue        = document.querySelector('.yearsavings-value'),

    expensesItem            = document.querySelectorAll('.expenses-item'),
    itemsBtn                = document.getElementsByTagName('button'),
    expensesItemBtn         = itemsBtn[0],
    optionalExpensesBtn     = itemsBtn[1],
    countBudgetBtn          = itemsBtn[2],
    optionalExpensesItem    = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome            = document.querySelector('#income'),
    savings                 = document.querySelector('#savings'),
    chooseSum               = document.querySelector('#sum'),
    choosePercent           = document.querySelector('#percent'),
    yearValue               = document.querySelector('.year-value'),
    monthValue              = document.querySelector('.month-value'),
    dayValue                = document.querySelector('.day-value'),
    money, 
    time;

    expensesItemBtn.disabled      = true;         
    optionalExpensesBtn.disabled  = true;     
    countBudgetBtn.disabled       = true;

startBtn.addEventListener('click', function(){
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");
    while(isNaN(money) || money == '' || money == null ){
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
    expensesItemBtn.disabled = false;         
    optionalExpensesBtn.disabled = false;     
    countBudgetBtn.disabled = false;
    
});

expensesItemBtn.addEventListener('click', function(){
let sum = 0;

for(let i = 0; i < expensesItem.length; i++){
    let a = expensesItem[i].value,
        b = expensesItem[++i].value;
    
    if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && 
        a !='' && b != '' && a.length < 50) {
        appData.expenses[a] = b;
        sum += +b;
    } else{
        alert('Введите корректное значение!');
        i--;
        }   
}
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function(){
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let optExp = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = optExp;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBudgetBtn.addEventListener('click', function(){

if (appData.budget != undefined) {
    appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed(2);
    dayBudgetValue.textContent = appData.moneyPerDay;
    if (appData.moneyPerDay < 100) {
        levelValue.textContent = 'Типичный представитель Украины';
    } else if ( appData.moneyPerDay > 100 && appData.moneyPerDay < 2000 ) {
        levelValue.textContent = 'Рабатяга';
    } else if (appData.moneyPerDay > 2000) {
        levelValue.textContent = 'Фантазер';
    } else {
        levelValue.textContent = 'Произошла ошибка';
    }
} else {
    dayBudgetValue.textContent = 'Произошла ошибка';
    }
});

chooseIncome.addEventListener('input', function(){
let items = chooseIncome.value;
appData.income = items.split(', ');
incomeValue.textContent = appData.income;
});

savings.addEventListener('input', function(){
if (appData.savings == true) {
    appData.savings = false;
} else {
    appData.savings = true;
    }
});

chooseSum.addEventListener('input', function(){
if (appData.savings == true) {
    let sum = +chooseSum.value,
        percent = +choosePercent.value;
        
    appData.monthIncome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent;
    
    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

choosePercent.addEventListener('input', function(){
if (appData.savings == true){
    let sum = +chooseSum.value,
        percent = +choosePercent.value;
        
    appData.monthIncome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent;
    
    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});



let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {} ,
    income: [],
    timeData: time ,
    savings: false,
};
