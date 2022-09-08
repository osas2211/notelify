const noteModel = require("../models")
const userModel = require("../../users/model")

// ****************************** CRUD CONTROLS ******************************

// POST Create a Note
const createNote = async (req, res) => {
  const { userID } = req.params
  const { label, imgUrl, textContent } = req.body
  try {
    const note = await noteModel.create({
      label,
      imgUrl,
      textContent,
      owner: userID,
    })
    await userModel.findByIdAndUpdate(userID, {
      $push: { notes: note.id },
    })
    res.status(201).json({ created: true, note })
  } catch (error) {
    res.status(400).json({ created: false, message: error.message })
  }
}

//GET Get Note
const getNote = async (req, res) => {
  const noteID = req.params.noteID
  try {
    const note = await noteModel.findById(noteID)
    res.status(200).json(note)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//GET Get Notes
const getNotes = async (req, res) => {
  try {
    const notes = await noteModel.find({}) //.populate("owner")
    return res.status(200).json({ notes })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// PUT Update Note
const updateNote = async (req, res) => {}

// DELETE Delete Note
const deleteNote = async (req, res) => {}

// *************************** COLLABORATION CONTROLS ***************************

// PUT Invite Collaborators
const inviteCollaborator = async (req, res) => {
  const userName = req.body.userName
  const ownerID = req.params.userID
  const noteID = req.body.noteID
  try {
    const owner = await userModel.findById(ownerID)
    const user = await userModel.findOne({ userName })
    const note = await noteModel.findById(noteID)
    const isInvited = user.invitations.includes(noteID)
    const isCollaborator = note.collaborators.includes(String(user._id))

    //send invitation only if the noteID does not appear in user invitations
    //or user is not a note collaborator
    if (isCollaborator) {
      return res.status(400).json({
        invitation_sent: false,
        message: "User is already a Collaborator",
      })
    }
    if (!isInvited) {
      // add invitation to user's invitations
      await user.updateOne(
        {
          $push: {
            invitations: {
              ownerID: ownerID,
              noteID: noteID,
            },
          },
        },
        { new: true }
      )
      return res.status(200).json({ invitation_sent: true, owner })
    }
    return res.status(400).json({
      invitation_sent: false,
      message: "User has already been Invited",
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// POST Accept Invitation
const acceptInvitation = async (req, res) => {
  const noteID = req.params.noteID
  const userID = req.body.userID
  try {
    const user = await userModel.findById(userID)
    const note = await noteModel.findById(noteID)
    const isCollaborator = note.collaborators.includes(String(user._id))
    const isInvited = user.invitations.includes(noteID)

    if (isCollaborator) {
      return res.status(400).json({
        accepted: false,
        message: "You're already a Collaborator",
      })
    }
    if (isInvited) {
      // Add note to collab notes
      await user.updateOne(
        {
          $push: {
            collab_notes: noteID,
          },
          // remove invitation since it's now accepted
          $pull: {
            invitations: { noteID: noteID },
          },
        },
        { new: true }
      )

      // add collaborator to notes collaborators
      await note.updateOne(
        {
          $push: {
            collaborators: userID,
          },
        },
        { new: true }
      )
      return res.status(200).json({ accepted: true, user })
    }
    return res.status(400).json({
      accepted: false,
      message: "You've not been invited to collaborate in this note",
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const noteControls = {
  createNote,
  getNote,
  getNotes,
  updateNote,
  deleteNote,
  inviteCollaborator,
  acceptInvitation,
}

module.exports = noteControls
