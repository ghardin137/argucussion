import './character-image.css'

export function CharacterImage({image, className}: {image: string, className: string}) {
   return  <div className={`character-image ${className}`}>
        <img src={image} />
    </div>
}