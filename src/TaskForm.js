import { useForm } from "react-hook-form";

// const formSemasi = Yup.object().shape({
//   title: Yup.string()
//     .required("Task başlığı yazmalısınız")
//     .min(3, "Task başlığı en az 3 karakter olmalı"),
//   description: Yup.string()
//     .required("Task açıklaması yazmalısınız")
//     .min(10, "Task açıklaması en az 10 karakter olmalı"),
//   people: Yup.array()
//     .max(3, "En fazla 3 kişi seçebilirsiniz")
//     .min(1, "Lütfen en az bir kişi seçin"),
// });

const TaskForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      people: [],
      status: "yapılacak",
    },
    mode: "all",
  });

  return (
    <form className="taskForm" onSubmit={handleSubmit(submitFn)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
          <input
            className="input-text"
            id="title"
            type="text"
            {...register("title", {
              required: "Task başlığı yazmalısınız.",
              minLength: {
                value: 3,
                message: "Task başlığı en az 3 karakter olmalı.",
              },
            })}
          />
        </label>
        <div>{errors?.title?.message}</div>
      </div>
      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
          <textarea
            className="input-textarea"
            rows="3"
            id="description"
            type="text"
            {...register("description", {
              required: "Task açıklaması yazmalısınız.",
              minLength: {
                value: 10,
                message: "Task açıklaması en az 10 karakter olmalı.",
              },
            })}
          ></textarea>
        </label>
        <div>{errors?.description?.message}</div>
      </div>
      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people", {
                  validate: (val) => {
                    if (val.length < 1) {
                      return "Lütfen en az bir kişi seçin.";
                    } else if (val.length > 3) {
                      return "En fazla 3 kişi seçebilirsiniz.";
                    }
                  },
                })}
              />
              {p}
            </label>
          ))}
        </div>
        <div>{errors?.people?.message}</div>
      </div>
      <div className="form-line">
        <button className="submit-button" type="submit">
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
