import React, { useState, useEffect } from "react";
import { fetchGenres } from "../../services/api/tmdb";
import { useFormik } from "formik";
import * as Yup from "yup";

const Filters = ({ onChange }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetchGenres();
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    getGenres();
  }, []);

  const formik = useFormik({
    initialValues: {
      selectedGenres: [],
      yearMin: 1900,
      yearMax: new Date().getFullYear(),
      ratingMin: 0,
      ratingMax: 10,
    },
    validationSchema: Yup.object({
      yearMin: Yup.number()
        .min(1900, "Min year must be between 1900 and the current year.")
        .max(Yup.ref("yearMax"), "Min year cannot be greater than max year.")
        .required("Required"),
      yearMax: Yup.number()
        .min(Yup.ref("yearMin"), "Max year cannot be less than min year.")
        .max(
          new Date().getFullYear(),
          "Max year must be between 1900 and the current year.",
        )
        .required("Required"),
      ratingMin: Yup.number()
        .min(0, "Min rating must be between 0 and 10.")
        .max(
          Yup.ref("ratingMax"),
          "Min rating cannot be greater than max rating.",
        )
        .required("Required"),
      ratingMax: Yup.number()
        .min(Yup.ref("ratingMin"), "Max rating cannot be less than min rating.")
        .max(10, "Max rating must be between 0 and 10.")
        .required("Required"),
    }),
    onSubmit: (values) => {
      onChange({
        with_genres: values.selectedGenres.join(","),
        "primary_release_date.gte": `${values.yearMin}-01-01`,
        "primary_release_date.lte": `${values.yearMax}-12-31`,
        "vote_average.gte": values.ratingMin,
        "vote_average.lte": values.ratingMax,
      });
    },
  });

  const handleGenreChange = (genreId) => {
    formik.setFieldValue(
      "selectedGenres",
      formik.values.selectedGenres.includes(genreId)
        ? formik.values.selectedGenres.filter((id) => id !== genreId)
        : [...formik.values.selectedGenres, genreId],
    );
  };

  const handleClearFilters = () => {
    formik.resetForm();
  };

  return (
    <div>
      <button
        className="btn btn-outline-info"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#filtersModal"
      >
        Open Filters
      </button>

      <div
        className="modal fade"
        id="filtersModal"
        tabIndex="-1"
        aria-labelledby="filtersModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title" id="filtersModalLabel">
                Filters
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="genres mb-4">
                  <h4 className="font-semibold mb-2">Genres</h4>
                  <div className="d-flex flex-wrap">
                    {genres.map((genre) => (
                      <div
                        key={genre.id}
                        className="form-check form-switch me-3 mb-2"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={genre.id}
                          checked={formik.values.selectedGenres.includes(
                            genre.id,
                          )}
                          onChange={() => handleGenreChange(genre.id)}
                          id={`genre-${genre.id}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`genre-${genre.id}`}
                        >
                          {genre.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="year-range mb-4 ">
                  <h4 className="font-semibold mb-2">Year Range</h4>
                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      name="yearMin"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formik.values.yearMin}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control me-2 ${formik.touched.yearMin && formik.errors.yearMin ? "is-invalid" : ""}`}
                    />
                    -
                    <input
                      type="number"
                      name="yearMax"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formik.values.yearMax}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ms-2 ${formik.touched.yearMax && formik.errors.yearMax ? "is-invalid" : ""}`}
                    />
                  </div>
                  {formik.touched.yearMin && formik.errors.yearMin ? (
                    <div className="invalid-feedback d-block">
                      {formik.errors.yearMin}
                    </div>
                  ) : null}
                  {formik.touched.yearMax && formik.errors.yearMax ? (
                    <div className="invalid-feedback d-block">
                      {formik.errors.yearMax}
                    </div>
                  ) : null}
                </div>
                <div className="rating-range mb-4">
                  <h4 className="font-semibold mb-2">Rating Range</h4>
                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      name="ratingMin"
                      min="0"
                      max="10"
                      step="0.1"
                      value={formik.values.ratingMin}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control me-2 ${formik.touched.ratingMin && formik.errors.ratingMin ? "is-invalid" : ""}`}
                    />
                    -
                    <input
                      type="number"
                      name="ratingMax"
                      min="0"
                      max="10"
                      step="0.1"
                      value={formik.values.ratingMax}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ms-2 ${formik.touched.ratingMax && formik.errors.ratingMax ? "is-invalid" : ""}`}
                    />
                  </div>
                  {formik.touched.ratingMin && formik.errors.ratingMin ? (
                    <div className="invalid-feedback d-block">
                      {formik.errors.ratingMin}
                    </div>
                  ) : null}
                  {formik.touched.ratingMax && formik.errors.ratingMax ? (
                    <div className="invalid-feedback d-block">
                      {formik.errors.ratingMax}
                    </div>
                  ) : null}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Apply Filters
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
