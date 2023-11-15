function populate(catagory , subcatagory){
    var catagory = document.getElementById(catagory)
    var subcatagory = document.getElementById(subcatagory)

    subcatagory.innerHTML="--PRODUCT SUB CATAGORY--"
    if(catagory.value === "housing"){
        var optionarr = ['Mortgage/Rent|Mortgage/Rent',
        'Property Taxes|Property Taxes',
        'Home Insurance|Home Insurance',
        'Utilities|Utilities']
    }else if(catagory.value === "food"){
        var optionarr = ['Groceries|Groceries',
        'Dining Out|Dining Out',
        'Snacks|Snacks']
    }else if(catagory.value === "healthcare"){
        var optionarr = ['Emergency Fund|Emergency Fund',
        'Retirement Fund|Retirement Fund',
        'Investment Contributions|Investment Contributions']
    }else if(catagory.value === "insurance"){
        var optionarr = ['Health Insurance|Health Insurance',
        'Life Insurance|Life Insurance',
        'Home Insurance|Home Insurance']
    }else if(catagory.value === "debtpayments"){
        var optionarr = ['Credit Cards|Credit Cards',
        'Loans|Loans',
        'Personal Debts|Personal Debts']
    }else if(catagory.value === "education"){
        var optionarr = ['Tuition|Tuition',
        'Books/Supplies|Books/Supplies',
        'Educational Services|Educational Services']
    }else if(catagory.value === "utilities"){
        var optionarr = ['Internet|Internet',
        'Cable/Satellite|Cable/Satellite',
        'Phone (Landline/Mobile)|Phone (Landline/Mobile)']
    }else if(catagory.value === "miscellaneous"){
        var optionarr = ['Any Other Expenses|Any Other Expenses']
    }

    for(var option in optionarr){
        var pair = optionarr[option].split("|")
        var newoption = document.createElement("option")
        newoption.value = pair[0]
        newoption.innerHTML = pair[1]
        subcatagory.options.add(newoption)
    }

}