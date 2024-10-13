export function formatAmount (amount) {
    const formatter = new Intl.NumberFormat('en-us', {
        style : "currency",
        currency: "PHP",
        maximumFractionDigits: 2
    })

    return formatter.format(amount)
}



