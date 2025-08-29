import type { BillSplitterState } from "./BillSplitter"

type ItemShare = {
    item: string,
    price: number
}

type FinalData = {
    [person: string]: ItemShare[]
}

type BillSummaryProps = {
    billSplitterData: BillSplitterState
}

const BillSummary: React.FC<BillSummaryProps> = ({ billSplitterData }) => {

    const formatCurrency = (num: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(num)

    const finalData: FinalData = billSplitterData.items.reduce((acc, item) => {
        const sharedPrice = item.amount / item.assignedTo.length
        item.assignedTo.forEach(person => {
            acc[person] = acc[person] || [];
            acc[person].push({
                item: item.name,
                price: sharedPrice
            })
        })
        return acc
    }, {} as FinalData);

    const totalPrice: number = billSplitterData.items.reduce((sum, item) => sum + item.amount, 0);



    return (
        <section>
            <h2> Bill Summary</h2>
            {Object.entries(finalData).map(([personName, items]) => {
                return (
                    <div key={personName} className="person-summary">
                        <h3>{personName}</h3>
                        {items.map((data, idx) => {
                            return (
                                <div key={idx} className="item-row">
                                    {data.item}
                                    <span>{formatCurrency(data.price)}</span>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            <div className="total">
                <strong>Total Price: {formatCurrency(totalPrice)}</strong>
            </div>
        </section>
    )
}

export default BillSummary
