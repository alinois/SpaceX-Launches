import noImage from '../../assets/opanki.png';
import type { Launch } from '../../types';
import { createPortal } from "react-dom"
import { useEffect } from "react";
import './Modal.scss'

interface ModalWindowProps {
    launch: Launch;
    opened: boolean;
    onClose: () => void;
    targetRef?: React.RefObject<HTMLElement | null>;
}

export const ModalWindow = ({ launch, opened, onClose, targetRef }: ModalWindowProps) => {
  useEffect(() => {
    const element = targetRef?.current;

    if (element) {
      if (opened) {
        element.classList.add('no-scroll');
      } else {
        element.classList.remove('no-scroll');
      }
    }

    return () => {
      if (element) {
        element.classList.remove('no-scroll');
      }
    };
  }, [opened, targetRef]);

    if (!opened) return null;

    const modalElement = document.getElementById('modal');
    if (!modalElement) return null;

    return createPortal (
        (
        <>
        <div className="modalElement">
            <div className="modalWindow">
                    <div className="modalHeader">
                        <h3>{launch.mission_name || 'No info'}</h3>
                        <button onClick={onClose} aria-label="Close">⨉</button>
                    </div>
                    <img src={launch.links?.mission_patch || noImage}/>
                    <div className="modalBody">
                        <h4>Mission name:</h4>
                        <p>{launch.mission_name || 'No info'}</p>
                        <h4>Rocket name:</h4>
                        <p>{launch.rocket?.rocket_name || 'No info'}</p>
                        <h4>Details:</h4>
                        <p>{launch.details || 'No info'}</p>
                    </div>
            </div>
        </div>
        </>
        ) , modalElement
    )
}