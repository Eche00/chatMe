import React from "react";

export default function () {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {" "}
      {error && <div className="text-red-500 mb-2">{error}</div>}{" "}
      <div className="flex justify-between items-center h-14 px-4 py-2 rounded-full w-full border-teal-400 border-2 fixed bg-white bottom-1">
        {" "}
        <textarea
          placeholder={
            audioBlob
              ? `Send ðŸŽ™️ï¸ voice message to ${data.user.displayName}`
              : `HiðŸ‘‹ ${data.user.displayName}`
          }
          className="flex-grow h-full border-none focus:outline-none bg-transparent resize-none"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyPress={handleKeyPress}
        />{" "}
        <div className="flex items-center justify-center">
          {" "}
          <div>
            {" "}
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />{" "}
            {audioBlob ? (
              <BsTrash3Fill
                className="text-xl text-teal-500 cursor-pointer"
                onClick={() => setAudioBlob(null)}
              />
            ) : (
              <label htmlFor="file">
                {" "}
                <MdAttachFile className="text-xl text-teal-500 cursor-pointer" />{" "}
              </label>
            )}{" "}
          </div>{" "}
          {imgPreview && (
            <img
              src={imgPreview}
              alt="Preview"
              className="h-60 w-60 object-cover rounded-md mx-2 absolute -top-60 right-5"
            />
          )}{" "}
          {loading ? (
            <div className="text-lg mx-4 text-teal-500 items-center flex justify-center">
              {" "}
              <Loader />{" "}
            </div>
          ) : (
            <>
              {" "}
              <button
                className="text-xl mx-4 text-teal-500"
                onClick={handleSend}>
                {" "}
                <BsSendFill />{" "}
              </button>{" "}
              {audioBlob
                ? ""
                : !text && (
                    <button
                      className="text-xl mx-4 text-teal-500"
                      onMouseDown={handleTouchStart}
                      onMouseUp={handleTouchEnd}
                      onMouseLeave={handleTouchEnd}>
                      {" "}
                      {isRecording ? <BsMicMuteFill /> : <BsMicFill />}{" "}
                    </button>
                  )}{" "}
            </>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
