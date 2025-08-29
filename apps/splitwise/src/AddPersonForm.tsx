import { useState } from "react"

type AddPersonProps = {
    onAddPerson: (name: string) => void
}

const AddPersonForm: React.FC<AddPersonProps> = ({ onAddPerson }) => {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAddPerson(name.trim());
            setName("")
        }
    }

    return (
        <section className="add-person-container">
            <h2> Add person</h2>
            <form className="add-person-form" onSubmit={handleSubmit}>
                <label htmlFor="personName">Person Name</label>
                <input id="personName" type="text" value={name} onChange={e => setName(e.target.value)} autoFocus />
                <button type="submit" disabled={!name.trim()}>
                    Add
                </button>
            </form>
        </section>
    )
}

export default AddPersonForm
