import React, { useState } from "react";
import Masonry from "react-masonry-css";
import TakeNote from "./TakeNote";
import Pin from "../images/push-pin.png";

const PinnedNote = ({ state, removeFromNotes, removePin }) => {
  if (state.pinned_id) {
    return (
      <div className="pinned">
        <h4>Pinned</h4>
        {state.notes_list
          .filter((n) => {
            return n.id === state.pinned_id;
          })
          .map((item, index) => (
            <p key={index} className="list-item" id="li">
              <span className="span1">
                {item.title}{" "}
                <button
                  className="pin-button"
                  onClick={(e) => removePin(item.id)}
                >
                  <img className="pin" src={Pin} alt="pin" />
                </button>
              </span>
              <span className="span2">{item.input}</span>
              <button
                className="list-button"
                onClick={(e) => removeFromNotes(index, item.id)}
              >
                Delete
              </button>
            </p>
          ))}
        <hr></hr>
      </div>
    );
  } else {
    return null;
  }
};
const Home = ({ state, styles, ...actions }) => {
  const [countfirst, setCountfirst] = useState(1);
  const [countsecond, setCountsecond] = useState(2);
  const [countthird, setCountthird] = useState(3);
  const [firstlimit, setFirstlimit] = useState(0);
  const [lastlimit, setLastlimit] = useState(6);

  const FirstShow = () => {
    setFirstlimit(countfirst * 6 - 6);
    setLastlimit(countfirst * 6);
  };
  const SecondShow = () => {
    setFirstlimit(countsecond * 6 - 6);
    setLastlimit(countsecond * 6);
  };
  const ThirdShow = () => {
    setFirstlimit(countthird * 6 - 6);
    setLastlimit(countthird * 6);
  };

  const Previous = () => {
    setCountfirst(countfirst - 1);
    setCountsecond(countsecond - 1);
    setCountthird(countthird - 1);
  };
  const Next = (e) => {
    setCountfirst(countfirst + 1);
    setCountsecond(countsecond + 1);
    setCountthird(countthird + 1);
  };
  return (
    <div>
      <TakeNote state={state} {...actions} />
      <div
        className="popup"
        style={state.showPopUp ? styles.inputStyle : styles.inputStyle1}
      >
        <p className="text">
          <span className="edit-title">
            <input
              value={state.edited_note.title}
              onChange={(e) =>
                actions.handleChangeNote(e.target.value, "title", "edited_note")
              }
            />{" "}
            <button
              onClick={(e) => actions.pinNote(state.popUp_id)}
              style={{ cursor: "pointer" }}
            >
              <img className="pin" src={Pin} alt="pin" />
            </button>
          </span>
          <input
            value={state.edited_note.input}
            onChange={(e) =>
              actions.handleChangeNote(e.target.value, "input", "edited_note")
            }
            className="edit-input"
          />
          <button
            onClick={(e) => actions.updateNote(state.popUp_id)}
            className="close"
            style={{ cursor: "pointer" }}
          >
            Save
          </button>
          <button
            onClick={(e) => actions.removeFromNotes(state.popUp_id)}
            className="delete"
            style={{ cursor: "pointer" }}
          >
            Close
          </button>
        </p>
      </div>
      <PinnedNote state={state} {...actions} />
      {console.log(state.notes_list.length)}
      <ul>
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {(!state.search ? state.notes_list : state.search_list)
            .filter((n) => {
              return n.id !== state.pinned_id && n.id !== state.popUp_id;
            })
            .slice(firstlimit, lastlimit)
            .map((item, index) => (
              <li key={index} className="list-item">
                <span className="span1">
                  {item.title}{" "}
                  <button
                    className="pin-button"
                    onClick={(e) => actions.pinNote(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img className="pin" src={Pin} alt="pin" />
                  </button>
                </span>
                <span className="span2">{item.input}</span>
                <button
                  className="list-button edit-button"
                  onClick={(e) => actions.showNote(item.id)}
                  style={{ cursor: "pointer" }}
                >
                  Edit
                </button>
                <button
                  className="list-button delete-button"
                  onClick={(e) => actions.removeFromNotes(index, item.id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </button>
              </li>
            ))}
        </Masonry>
      </ul>
      <nav aria-label="Page navigation example">
        <ul class="pagination" style={{ justifyContent: "center" }}>
          {countfirst >> 1 ? (
            <li
              class="page-item"
              style={{ cursor: "pointer" }}
              onClick={Previous}
            >
              <div class="page-link">Previous</div>
            </li>
          ) : (
            <li class="page-item" style={{ cursor: "pointer" }}>
              <div class="page-link" style={{ color: "lightblue" }}>
                Previous
              </div>
            </li>
          )}

          <li
            class="page-item"
            style={{ cursor: "pointer" }}
            onClick={FirstShow}
          >
            <div class="page-link">{countfirst}</div>
          </li>
          <li
            class="page-item"
            style={{ cursor: "pointer" }}
            onClick={SecondShow}
          >
            <div class="page-link">{countsecond}</div>
          </li>
          <li
            class="page-item"
            style={{ cursor: "pointer" }}
            onClick={ThirdShow}
          >
            <div class="page-link">{countthird}</div>
          </li>
          {countthird <= state.notes_list.length / 6 ? (
            <li class="page-item" onClick={Next} style={{ cursor: "pointer" }}>
              <div class="page-link">Next</div>
            </li>
          ) : (
            <li class="page-item" style={{ cursor: "pointer" }}>
              <div class="page-link" style={{ color: "lightblue" }}>
                Next
              </div>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Home;
