{
  /* <div className="space-y-4">
        <ScrollArea className="h-[600px]">
          <h2 className="bg-gray-100 px-6 py-4 text-left font-medium">
            Preguntas
          </h2>
          <table className="w-full">
            <tbody>
              {listEvaluation.map((evaluation, idx) => (
                <tr key={idx} className="border p-2">
                  <td className="p-2 text-sm text-left font-semibold uppercase">
                    {evaluation.question.code} - {evaluation.question.question}
                  </td>
                  {evaluation?.question?.answers?.map((answer) => (
                    <td
                      key={answer.id}
                      className="w-24 min-w-24 max-w-24 h-16 p-2 text-center border"
                      style={{
                        backgroundColor:
                          evaluation.student_answer === answer.id
                            ? "#256056"
                            : "transparent",
                        color:
                          evaluation.student_answer === answer.id
                            ? "#fff"
                            : "#000",
                      }}
                      {...(!isBlocked && {
                        onClick: () =>
                          handleSelectAnswer(evaluation.id, answer.id),
                      })}
                    >
                      <div className="flex items-center justify-center uppercase">
                        {answer.option}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div> */
}
