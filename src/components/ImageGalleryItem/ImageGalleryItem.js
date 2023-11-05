import { ModalImg } from 'components/ModalImg/ModalImg';
import { useState } from 'react';
import { Image } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ item: { webformatURL, largeImageURL, tags } }) => {
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
    setIsOpen(true)
}
const closeModal = () => {
    setIsOpen(false)
}
    return < ><Image src={webformatURL} alt={tags}  onClick={openModal}></Image>
                <ModalImg state={isOpen} onClose={closeModal} imageUrl={largeImageURL} tags={tags} />
                </>
}


