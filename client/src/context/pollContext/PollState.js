import React, { useReducer } from "react"
import { PollContext } from "./PollContext"
import axios from "axios"
import { API } from "../../utils/proxy"
import { POLL_ERROR, POLL_GET_ALL, POLL_LOADING } from "../types"
import Pollreducer from "./Pollreducer"

export const PollState = ({ children }) => {
  const initialState = {
    polls: [],
    error: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(Pollreducer, initialState)

  const getAllPolls = async () => {
    try {
      dispatch({
        type: POLL_LOADING,
        payload: true,
      })
      const response = await axios.get(`${API}/polls`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      dispatch({
        type: POLL_GET_ALL,
        payload: response.data,
      })
    } catch (error) {
      // console.log(error)
      dispatch({
        type: POLL_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const markPollYes = async (userId, pollId) => {
    try {
      dispatch({
        type: POLL_LOADING,
        payload: true,
      })
      const response = await axios.get(
        `${API}/poll/agree/${userId}`,
        { pollId },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      return response.data
    } catch (error) {
      dispatch({
        type: POLL_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const markPollNo = async (userId, pollId) => {
    try {
      dispatch({
        type: POLL_LOADING,
        payload: true,
      })
      const response = await axios.get(
        `${API}/poll/disagree/${userId}`,
        { pollId },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      return response.data
    } catch (error) {
      dispatch({
        type: POLL_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const skipPoll = async (userId, pollId) => {
    try {
      dispatch({
        type: POLL_LOADING,
        payload: true,
      })
      const response = await axios.get(
        `${API}/poll/skip/${userId}`,
        { pollId },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      return response.data
    } catch (error) {
      dispatch({
        type: POLL_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  return (
    <PollContext.Provider
      value={{
        polls: state.polls,
        error: state.error,
        loading: state.loading,
        getAllPolls,
        markPollNo,
        markPollYes,
        skipPoll,
      }}
    >
      {children}
    </PollContext.Provider>
  )
}