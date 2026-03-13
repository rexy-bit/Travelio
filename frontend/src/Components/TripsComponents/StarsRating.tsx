

export default function StarsRating({ note } : {note : number}) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (note >= i) {
      stars.push(<i key={i} className="fas fa-star text-yellow-500 text-[13px]" />);
    } else if (note >= i - 0.5) {
      stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-500 text-[13px]" />);
    } else {
      stars.push(<i key={i} className="far fa-star text-yellow-500 text-[13px]" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
}
