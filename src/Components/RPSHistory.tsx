// import {ChangeEvent, useEffect, useState} from "react";
//
// interface rpsBet {
//     Value: number;
//     WinAmount: number;
// }
//
// export const RPSHistory= () => {
//         const [entriesToShow, setEntriesToShow] = useState<number>(3);
//         const [RpsBetHistory, setBetHistory] = useState<rpsBet[]>([]);
//         const [isLoading, setIsLoading] = useState<boolean>(true);
//         const [error, setError] = useState<string | null>(null);
//         // const phoneNumber = useAppStore((state) => state.phoneNumber);
//         // const formattedPhoneNumberMines = (phoneNumber ?? '').startsWith('0')
//         //     ? `254${phoneNumber.slice(1)}`
//         //     : phoneNumber;
//
//         // const accessToken = localStorage.getItem('access');
//
//         const handleRPSEntriesChange = (event: ChangeEvent<HTMLSelectElement>) => {
//             setEntriesToShow(Number(event.target.value));
//         };
//
//         useEffect(() => {
//             const fetchRPSBetHistory = async () => {
//                 try {
//                     setIsLoading(true);
//                     const response = await fetch(
//                         `https://lottomotto.co.ke//v1/bets/bet-history/254791847766?gameName=ROCKPAPERSCISSORS`,
//                         {
//                             method: 'GET',
//                             headers: {
//                                 // 'Authorization': `Bearer ${accessToken}`,
//                                 'Content-Type': 'application/json',
//                             },
//                         }
//                     );
//                     if (!response.ok) {
//                         throw new Error(`Error ${response.status}`);
//                     }
//                     const responseData = await response.json();
//                     // console.log("responseData:", responseData);
//
//                     if (responseData?.data && Array.isArray(responseData.data)) {
//                         setBetHistory(responseData.data);
//                     } else {
//                         setError("No bet history available");
//                     }
//                 } catch (err) {
//                     setError(err instanceof Error ? err.message : '');
//                 } finally {
//                     setIsLoading(false);
//                 }
//             };
//             void fetchRPSBetHistory();
//         }, []);
// return(
//     <>
//         <div className="bet-history-rps">
//             <div className="bet-history-rps-filter">
//                 <span className="entries-title-rps">Show History: </span>
//                 <select className="rps-entries" value={entriesToShow} onChange={handleRPSEntriesChange}>
//                     <option value={0}>0</option>
//                     <option value={3}>3</option>
//                     <option value={5}>5</option>
//                 </select>
//             </div>
//
//             {isLoading ? (
//                 <span>Loading bet history...</span>
//             ) : error ? (
//                 <span className="error">No Data at the Moment</span>
//             ) : (
//         <div className="rps-history-dropdown">
//             <table className="rps-history-table">
//                 <thead>
//                 <tr>
//                     <th>Multiplier</th>
//                     <th>Win Amount</th>
//                     <th>status</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {Array.isArray(RpsBetHistory) && RpsBetHistory.slice(0, entriesToShow).map((bet, index) => (
//                     <tr key={index}>
//                         <td >{bet.WinAmount}</td>
//                         <td style={{color: Number(bet.WinAmount) > 0 ? "lawngreen" : "red"}}
//                         >
//                             {Number(bet.WinAmount) > 0 ? "WIN" : "LOSE"}
//                         </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//             )}
//         </div>
//     </>
// );}