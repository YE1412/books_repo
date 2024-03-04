import type { Metadata } from "next";
import BookList from '@/app/ui/book/book-list';

export const metadata: Metadata = {
  title: 'Book List Page',
  description: 'The official Next.js Book App, built with App Router.'
};


export default async function Page({ data }){
  //const books = await fetchBooksData();
  /*const [books, setBooks] = useState([]);
  useEffect(() => {
    const updateBooks = async () => {
      const updatedBooks = await fetchBooksData();
      setBooks(updateBooks);
    };
    updateBooks();
  });*/
  
  //console.log('All books !');
  //console.log(books);
  return(
    <div>
      <BookList />
    </div>
  )
}

// This gets called on every request
//export async function getServerSideProps() {
  // Fetch data from external API
  /*const res = await fetch(`https://.../data`)
  const data = await res.json()*/
 
  // Pass data to the page via props
  //return { props: { "books": 1 } };
//}