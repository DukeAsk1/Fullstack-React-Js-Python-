import React from "react";
import Main from "../Homepage/Main";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import img from "../basicuser.png";

const Product = () => {
  const { id } = useParams();

  const PageProduit = () => {
    return (
      <>
        <div className="PageProduit-container">
          <div className="produit-container">
            <div className="imagecontainer">
              <img src={img}></img>
            </div>
            <div className="informations-container">
              <h3>TITRE</h3>
              <h6>dans category category</h6>
              <h5>PRIX</h5>
              <h5>date de publication</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis quo rem dolore magni eum omnis quis velit et voluptates
                nam cum ut nulla in reprehenderit est vel laboriosam aperiam
                qui, temporibus eius natus sunt. Enim eligendi vero commodi
                animi quisquam laudantium eum. Repudiandae, repellat nam eaque
                quia quae sunt ex adipisci commodi tempore vel soluta?
                Distinctio quidem voluptates ullam nisi provident velit dolore,
                impedit nemo necessitatibus earum accusamus numquam fugit,
                blanditiis molestiae odit, veritatis tempora magni? Autem
                architecto facilis excepturi molestiae, tenetur nesciunt
                possimus labore! Inventore cumque fuga reiciendis fugit
                excepturi voluptas repudiandae laudantium in ad, iste
                perferendis, quibusdam cum iusto dolores! Eos vitae, doloremque
                laboriosam necessitatibus enim exercitationem nisi sunt dicta
                aperiam possimus, dolores in nulla sint corrupti aliquam autem
                asperiores perferendis quasi sequi natus quibusdam consequuntur
                beatae maiores excepturi? Asperiores commodi ipsa praesentium?
                Fuga nihil, voluptatem esse quae nesciunt officia atque qui
                ipsam porro dolor eligendi excepturi debitis eaque! Aliquam
                repudiandae, cum rerum quibusdam earum fuga sunt eligendi ullam
                modi nihil atque laboriosam hic at, totam laborum cupiditate
                saepe deserunt consequuntur nam iste fugit quis quasi.
                Voluptatum consequuntur architecto explicabo qui nisi cumque
                sapiente eius perferendis aspernatur accusantium, iure illo
                iusto vitae, recusandae exercitationem itaque eligendi rem
                mollitia.
              </p>
            </div>
          </div>
          <div className="postedbyuser">
            <h2>Posté par :</h2>
            <div className="pppseudo">
              <img src={img}></img>
              <h3>PSEUDO</h3>
            </div>
            <div className="infos">
              <h4>De l'ecole : ecole</h4>
              <h4>Le : </h4>
            </div>
            <div className="voirleprofil">
              <Link to={`/user/0`} className="text-link">
                <button>Voir le profil</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="mainproduct-container">
        <Main />
        <PageProduit />
      </div>
    </>
  );
};

export default Product;
