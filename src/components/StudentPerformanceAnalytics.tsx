import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { ToastContext } from '../utility/ToastContext';
import { getStudentSubjectAverages } from '../redux/slices/scoreSheetSlice';
import { showToastify } from '../utility/Toastify';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const StudentPerformanceAnalytics = (props: any) => {
  const { params, index } = props;
  const [chartData, setChartData] = useState<ChartData<'bar'> | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);

  useEffect(() => {
    if (index === 'third' && params && params.student_id) {
      
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await dispatch(getStudentSubjectAverages(params)).unwrap();
          
          if (response.status === 'success') {
            const data = response.stage_subject_averages;
            const initialSubjects: Set<string> = new Set(data.datasets.map((d: { label: string }) => d.label));

            setChartData(data);
            setSelectedSubjects(initialSubjects);
          } else {
            setError(response.message || 'Failed to fetch data');
          }
        } catch (err) {
          setError('An error occurred while fetching data');
          showToastify('Failed to load performance data', 'error');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }else if(index === 'third' && params && !params.student_id){
      showToastify('Select your ward to view performance analysis', 'success');
    }
  }, [dispatch, params, setShowToast]);

  const toggleSubject = (subject: string) => {
    const newSelection = new Set(selectedSubjects);
    newSelection.has(subject) ? newSelection.delete(subject) : newSelection.add(subject);
    setSelectedSubjects(newSelection);
  };

  if (loading) return <div>Loading performance data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chartData) return <div>No performance data available</div>;

  // Filter datasets based on selected subjects
  const filteredData = {
    ...chartData,
    datasets: chartData.datasets.filter((dataset) =>
      dataset.label ? selectedSubjects.has(dataset.label) : false
    ),
  };

  return (
    <div className="performance-chart">
      <div className="subject-selector">
        {chartData.datasets.map((dataset) => (
          <label
            key={dataset.label}
            style={{ color: dataset.borderColor as string, marginRight: '1rem' }}
          >
            <input
              type="checkbox"
              checked={dataset.label ? selectedSubjects.has(dataset.label) : false}
              onChange={() => toggleSubject(dataset.label || '')}
              style={{ marginRight: '0.5rem' }}
            />
            <span
              className="color-indicator"
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: dataset.borderColor as string,
                marginRight: '0.5rem',
              }}
            />
            {dataset.label}
          </label>
        ))}
      </div>

      <div className="chart-container">
        <Bar
          data={filteredData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }, // Custom checkboxes are used instead
              tooltip: {
                callbacks: {
                  label: (context) =>
                    `${context.dataset.label}: ${context.parsed.y}%`,
                },
              },
            },
            scales: {
              y: {
                min: 0,
                max: 100,
                title: {
                  display: true,
                  text: 'Average Score (%)',
                },
              },
            },
          }}
        />
      </div>

      <style>{`
        .performance-chart {
          padding: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .subject-selector {
          margin-bottom: 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .chart-container {
          height: 400px;
          position: relative;
        }

        label {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 0.9rem;
        }

        input[type='checkbox'] {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default StudentPerformanceAnalytics;