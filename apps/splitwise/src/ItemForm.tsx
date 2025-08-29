import type { BillItem, Person } from "./BillSplitter";

type ItemFormProps = {
    billItem: BillItem,
    persons: Person[],
    onUpdateItemName: (id: number, name: string) => void,
    onUpdateItemAmount: (id: number, amount: number) => void,
    onAssignedPerson: (id: number, person: string) => void,
}

const ItemForm: React.FC<ItemFormProps> = ({
    billItem,
    persons,
    onUpdateItemName,
    onUpdateItemAmount,
    onAssignedPerson
}) => {
    const nonSelectedPersons = persons.filter(person => billItem.assignedTo.indexOf(person.name) < 0)

    return (
        <form className="bill-item-form" data-id={billItem.id} >
            <input className="mr-1" name="name" value={billItem.name} onChange={(e) => onUpdateItemName(billItem.id, e.target.value)}/>
            <input className="mr-1" name="amount" value={billItem.amount} onChange={(e) => onUpdateItemAmount(billItem.id, Number(e.target.value))} />
            {
                billItem.assignedTo.map((assignedPerson: string, index: number) => (<div className="mr-1" key={`${billItem.id}-${index}`}>{assignedPerson}</div>))
            }
            <select className="" name="assignedTo" onChange={(e) => onAssignedPerson(billItem.id, e.target.value)}>
                <option value="">Select Person</option>
                {nonSelectedPersons.map((nonSelectedPerson: Person) => {
                    return <option key={`${billItem.id}-${nonSelectedPerson.id}`} value={nonSelectedPerson.name}>{nonSelectedPerson.name}</option>
                })}
            </select>
        </form>
    )
}

export default ItemForm
