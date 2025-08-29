import type { BillSplitterState } from "./BillSplitter"
import ItemForm from "./ItemForm"

type AddItemsFormProps = {
    billSplitterData: BillSplitterState
    onAddItem: () => void,
    onUpdateItemName: (id: number, name: string) => void,
    onUpdateItemAmount: (id: number, amount: number) => void,
    onAssignedPerson: (id: number, person: string) => void,
}

const AddItemsForm: React.FC<AddItemsFormProps> = ({ billSplitterData, onAddItem, onUpdateItemName, onUpdateItemAmount, onAssignedPerson }) => {
    return (
        <section className="add-items-container">
            <h2>Add Items</h2>

            {billSplitterData.items.map(billItem => {
                return (
                    <ItemForm
                        key={billItem.id}
                        billItem={billItem}
                        persons={billSplitterData.people}
                        onUpdateItemName={onUpdateItemName}
                        onUpdateItemAmount={onUpdateItemAmount}
                        onAssignedPerson={onAssignedPerson}
                    />
                )
            })}
            <button onClick={onAddItem}>Add Another</button>
        </section>
    )
}

export default AddItemsForm
