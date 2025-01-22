import { UserPlusIcon } from "@heroicons/react/16/solid";
import { Form } from "react-router-dom";

//image
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal Budgeting Is The Secrect To Financial Freedom. Start Your
          Journey Today.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name ?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          {/* For distinguished multiple form */}
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Procced</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} width={600} />
    </div>
  );
};

export default Intro;
