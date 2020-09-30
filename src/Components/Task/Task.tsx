import React, { useEffect, useRef, useState }  from 'react';
// import PropTypes from 'prop-types';
import './Task.css'
import { TaskType } from '../../App'
import moment from 'moment';

type Props = {
  task: TaskType,
  onToggle: (id: number) => void,
  onRemove: (id: number) => void, 
}

function Task (props: Props) {
  const id = props.task.id;
  const timeoutId = 0;
  // let prevTaskComplitedAt;
  // const prevTaskComplitedAtRef = useRef();
  // useEffect(()=>{
  //   prevTaskComplitedAtRef.current = !!props.task.completedAt ? props.task.completedAt : 0;  
  // })
  // prevTaskComplitedAt = prevTaskComplitedAtRef.current;

  // componentDidUpdate(prevProps) {
  //   if (Boolean(prevProps.task.completedAt) === !this.props.task.completedAt) {
  //     if (!this.props.task.completedAt) {
  //       clearTimeout(this.timeoutId);
  //     }
      
  //     if (Boolean(this.props.task.completedAt)) {
  //       this.timeoutId = setTimeout(() => {
  //         this.props.onRemove(this.id)
  //       }, 60000);
  //     }
  //   }
  // }

    const { task } = props;

    return (
      <div className="tasklist__task task">
        <div className="task__body">
          <div 
            onClick={() => props.onToggle(id)}
            className={`roundedCheckbox${Boolean(task.completedAt) ? ' checked' : ''}`}>
            <input 
              type="checkbox"
              name="isComplited"
              className="task__checkbox roundedCheckbox"
              id={`roundedCheckbox${task.id}`}
              checked={!!task.completedAt}
              onChange={() => props.onToggle(id)}
            />
            <label htmlFor={`roundedCheckbox${task.id}`}></label>
          </div>
          <p className={`task__title${Boolean(task.completedAt) ? ' task__completed' : ''}`}>{task.title}</p>
        </div>
        {
          Boolean(task.completedAt) && 
            (<p className="task__date">
              {moment(task.completedAt).format('MMM D, YYYY')}
            </p>)
        }       
      </div>
    )
}

// Task.propTypes = {
//   task: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//   }).isRequired,
//   onToggle: PropTypes.func.isRequired,
//   onRemove: PropTypes.func.isRequired,
// };

export default Task;