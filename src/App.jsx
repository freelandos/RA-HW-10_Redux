import { ItemForm } from "./components/ItemForm";
import { ItemList } from "./components/ItemList";

export default function App() {
  return (
    <div className="container mx-auto">
      <ItemForm />
      <ItemList />
    </div>
  )
}
