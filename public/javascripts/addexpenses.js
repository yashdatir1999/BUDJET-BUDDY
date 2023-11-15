function populate(catagory , subcatagory){
    var catagory = document.getElementById(catagory)
    var subcatagory = document.getElementById(subcatagory)

    subcatagory.innerHTML="--PRODUCT SUB CATAGORY--"
    if(catagory.value === "housing"){
        var optionarr = ['rentormortgagepayments|RENT OR MORTGAGE PAYMENTS',
        'propertytaxes|PROPERTY TAXES',
        'homemaintenanceandrepairs|HOME MAINTENANCE AND REPAIRS']
    }else if(catagory.value === "bills"){
        var optionarr = ['electricity|ELECTRICITY',
        'gas|GAS',
        'water|WATER',
        'internetandcable|INTERNET AND CABLE',]
    }else if(catagory.value === "groceries"){
        var optionarr = ['foodandbeveragesforhomeconsumption|FOOD AND BEVERAGES FOR HOME CONSUMPTION']
    }else if(catagory.value === "transportation"){
        var optionarr = ['gasolineorpublictransportationcosts|GASOLINE OR PUBLIC TRANSPORTATION COSTS',
        'vehiclemaintenanceandrepairs|VEHICLE MAINTENANCE AND REPAIRS',
        'insurance|INSURANCE']
    }else if(catagory.value === "healthcare"){
        var optionarr = ['healthinsurancepremiums|HEALTH INSURANCE PREMIUMS',
        'Medicalexpenses|MEDICAL EXPENSES (CO-PAYS, PRESCRIPTIONS)',
        'healthandwellnessexpenses|HEALTH AND WELLNESS EXPENSES']
    }else if(catagory.value === "insurance"){
        var optionarr = ['lifeinsurance|LIFE INSURANCE',
        'propertyinsurance|PROPERTY INSURANCE (HOMEOWNERS/RENTERS INSURANCE)',
        'autoinsurance|AUTO INSURANCE']
    }else if(catagory.value === "debtpayments"){
        var optionarr = ['creditcardpayments|CREDIT CARD PAYMENTS',
        'loanpayments|LOAN PAYMENTS (PERSONAL, STUDENT, ETC.)']
    }else if(catagory.value = "personalcare"){
        var optionarr = ['haircutsandsalonservices|HAIRCUTS AND SALON SERVICES',
        'toiletriesandpersonalhygieneproducts|TOILETRIES AND PERSONAL HYGIENE PRODUCTS']
    }else if(catagory.value = "entertainment"){
        var optionarr = ['diningout|DINING OUT',
        'moviesconcertsevents|MOVIES, CONCERTS, EVENTS',
        'hobbiesandsubscriptions|HOBBIES AND SUBSCRIPTIONS']
    }else if(catagory.value === "clothing"){
        var optionarr = ['clothingpurchases|CLOTHING PURCHASES',
        'drycleaningandlaundry|DRY CLEANING AND LAUNDRY']
    }else if(catagory.value === "education"){
        var optionarr = ['tuitionandschoolfees|TUITION AND SCHOOL FEES',
        'booksandeducationalmaterials|BOOKS AND EDUCATIONAL MATERIALS']
    }else if(catagory.value === "savings"){
        var optionarr = ['contributionstosavingsaccounts|CONTRIBUTIONS TO SAVINGS ACCOUNTS',
        'investments|INVESTMENTS']
    }else if(catagory.value === "giftsdonations"){
        var optionarr = ['giftpurchases|GIFT PURCHASES',
        'charitabledonations|CHARITABLE DONATIONS']
    }else if(catagory.value === "taxes"){
        var optionarr = ['incometaxes|INCOME TAXES',
        'propertytaxes|PROPERTY TAXES']
    }else if(catagory.value === "miscellaneous"){
        var optionarr = ['anyotherexpenses|ANY OTHER EXPENSES THAT DON NOT FIT INTO SPECIFIC CATEGORIES']
    }

    




}