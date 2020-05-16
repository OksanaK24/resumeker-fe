import React, { useState } from "react";
import { connect } from "react-redux";

//Actions
import {
  addTechSkill,
  removeTechSkill,
} from "../../actions/resumeFormActions.js";

import SingleFieldFormTemplate from "./formsTemplate/singleFieldFormTemplate"
import TipsLayout from "./formUtils/tipsLayout"

import {
  Button,
  CssBaseline,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Chip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    display: "flex",
    flexDirection: "column",
  },
  previousButton: {
    margin: theme.spacing(3, 0, 2),
    width: "49%",
  },
  nextButton: {
    margin: theme.spacing(3, 0, 2),
    width: "49%",
    height: "3.5rem",
  },
  skillContainer: {
    display: "flex",
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(1.2),
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
}));

function TechSkills(props) {
  const [info, setInfo] = useState({
    id: Date.now(),
    skill: "",
  });

  const classes = useStyles();

  const nextPage = (event) => {
    if (info.skill.length > 0) {
      props.addTechSkill(info);
    }
    props.history.push("/form/generalskills");
  };

  const anotherSkill = (event) => {
    event.preventDefault();
    if (info.skill.length > 0) {
      props.addTechSkill(info);
    }
    setInfo({
      id: Date.now(),
      skill: "",
    });
  };
  const onChange = (event) => {
    event.preventDefault();
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const handleDelete = (skillToDelete) => (event) => {
    event.preventDefault();
    props.removeTechSkill(skillToDelete);
    setInfo({ ...info });
  };

  return (
    <Grid>
      <Grid container componet="main" className={classes.root}>
        <CssBaseline />
        <TipsLayout />
        <Grid item xs={12} sm={8} md={9} component={Paper} elevation={6} square>
          <Grid className={classes.paper}>
            <Typography component="h1" variant="h5">
              Tell us about some of the technical skills that you possess!
            </Typography>
            <Typography color="textSecondary" component="h5" variant="subtitle2">
              (CSS, HTML, JS, React, Redux, JAVA, NodeJS, GraphQL, Express,
              Postgres, SQLite, Knex,etc)
            </Typography>
            <form className={classes.form} onSubmit={anotherSkill}>
              <SingleFieldFormTemplate onChange={onChange} info={info.skill} anotherOne={anotherSkill} name="skill" label="Tech Skill" />
              <Grid className={classes.skillContainer}>
                <Paper
                  component="ul"
                  square="true"
                  className={classes.chipContainer}
                >
                  <Chip
                    label="Your Skills:"
                    className={classes.chip}
                    color="primary"
                  />
                  {props.resumeData.techSkills.map((data) => {
                    return (
                      <li key={data.id}>
                        <Chip
                          label={data.skill}
                          onDelete={handleDelete(data)}
                          className={classes.chip}
                        />
                      </li>
                    );
                  })}
                </Paper>
              </Grid>

              <Grid className={classes.buttonContainer}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.previousButton}
                  onClick={() => {
                    props.history.push("/form/work");
                  }}
                >
                  Previous Form
                </Button>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.nextButton}
                  onClick={() => {
                    nextPage();
                  }}
                >
                  Next Form
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
      <button onClick={() => nextPage()}>Next Page</button>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    resumeData: state.resumeFormReducer.resumeData,
    resumeError: state.resumeFormReducer.error,
    resumeLoading: state.resumeFormReducer.loading,
  };
};

export default connect(mapStateToProps, { addTechSkill, removeTechSkill })(
  TechSkills
);