import React, { useEffect, useRef }  from 'react';
import './Task.css'
import { TaskType } from '../../App'
import moment from 'moment';

type Props = {
  task: TaskType,
  onToggle: (id: number) => void,
  onRemove: (id: number) => void, 
}

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Task (props: Props) {
  const id = props.task.id;
  let timeoutId : any = 0;
  const prevTaskComplitedAt = usePrevious(props.task.completedAt)
  useEffect(()=>{
    if (Boolean(prevTaskComplitedAt) === !props.task.completedAt) {
      if (!props.task.completedAt) {
        clearTimeout(timeoutId);
      }
      if (Boolean(props.task.completedAt)) {
        timeoutId = setTimeout(() => {
          props.onRemove(id)
        }, 60000);
      }
    }
    return () => {
      clearTimeout(timeoutId);
    }
  })

  const { task } = props;

  return (
    <div className="tasklist__task task">
      <div className="task__body">
        <div 
          // onClick={() => props.onToggle(id)}
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

export default Task;