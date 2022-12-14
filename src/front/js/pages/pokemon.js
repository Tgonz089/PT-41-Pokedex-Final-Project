import React, { useState, useEffect, useContext } from "react";
import { ProgressBar } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "800000",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

export const Pokemon = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [p_type, setType] = useState([]);
  const [stat_names, setStat_names] = useState([]);
  const [stats, setStats] = useState([]);
  const [data, setData] = useState({});
  const [desc, setDesc] = useState({});
  const [render, rerender] = useState(false);

  useEffect(() => {
    actions.rehydrate();
  }, []);

  useEffect(() => {
    actions.getPokemonDesc(data)?.then((result) => setDesc(result));
    setData(store.pokemon[params.id]);

    setType(
      data?.type?.split(",").map((types) => {
        return types.trim();
      })
    );

    setStat_names(
      data?.stat_names?.split(",").map((names) => {
        return names.trim();
      })
    );

    setStats(
      data?.stats?.split(",").map((stats) => {
        return stats.trim(stats);
      })
    );
    rerender(!render);
  }, [store.pokemon]);

  return (
    <div className="jumbotron">
      
        <img className="soloimg" src={data?.image} />
        <h1 className="display-4">{data?.name}</h1>
        <div className="grid">
          <p className="single typingPoke">
            {p_type?.map((type) => (
              <span
                key={type}
                className="badge badge-pill mr-1"
                style={{
                  backgroundColor: `#${TYPE_COLORS[type]}`,
                  color: "white",
                }}
              >
                {type
                  .toLowerCase()
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </span>
            ))}
          </p>

          <p className="single">
            <strong>Number:</strong> {data?.id}
          </p>
          <p className="single">
            <strong>Abilities:</strong> {data?.abilities}
          </p>
          <p className="single">
            <strong>Height:</strong> {data?.height}
          </p>
          <p className="single-last">
            <strong>Weight:</strong> {data?.weight}
          </p>
        </div>

        <div className="statsGraph">
          <h4>Base Stats</h4>
          {stat_names?.map((name, idx) => {
            return (
              <>
                <strong>{name?.toUpperCase()}</strong>
                <ProgressBar now={stats[idx]} max={255} label={stats[idx]} />
              </>
            );
          })}
        </div>
        <p className="detail"><strong>{desc?.flavor_text}</strong></p>
      
      <Link to="/" className="btn btn-danger btn-lg">
          Back home
      </Link>
    </div>
  );
};

Pokemon.propTypes = {
  match: PropTypes.object,
};
