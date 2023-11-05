import { fetchImages } from "Api";
import { Button } from "components/Button/Button";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Loader } from "components/Loader/Loader";
import { SearchBar } from "components/Searchbar/SearchBar";
import { useEffect, useState } from "react";
import { Layot } from "./Layout";

export const App = () => {
  const [imageItem, setImageItem] = useState([]);
  const [page, setPage] = useState(1);
  const [descriptor, setDescriptor] = useState(``);
   // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  
  const changeDescriptor = ( value ) => {
    if (descriptor === value) {
      return
    }
    setDescriptor(value);
    setPage(1);
    setImageItem([])
  }
  const changePage = () => {
    setPage(prevState => prevState +1)
  }
  useEffect(() => {
    async function getImages() {
      setLoadMore(false)
      setError(false);
        setLoading(true);
      try {
        if (descriptor === ``) { 
          return
        }
          const images = await fetchImages(page, descriptor);
          if (images.hits.length === 12) {
            setLoadMore(true)
          }
          if (Array.isArray(imageItem)) {
            setImageItem(images)
            return
          }
          setImageItem(prevState => ({ ...prevState, hits: [...prevState.hits, ...images.hits] }))
    } catch (error) {
        console.log(error)
      alert(`Reload page`)
      } finally {
        setLoading(false)
      }
    } 
    getImages(); // eslint-disable-next-line 
  }, [descriptor, page])
  
  return <Layot>
      <SearchBar onChange={changeDescriptor} />
      <Loader visible={loading} />
      {imageItem.totalHits > 0 && <ImageGallery images={imageItem} />}
      {loadMore && <Button onChange={changePage} />}
    </Layot>
}